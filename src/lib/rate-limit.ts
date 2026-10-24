interface RateLimitRecord {
  timestamps: number[];
}

// In-memory sliding window rate limiter
// Cleaned up periodically to avoid unbounded memory growth
const ipTracker = new Map<string, RateLimitRecord>();

// Periodic cleanup every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function purgeExpired(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [key, record] of ipTracker.entries()) {
    record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);
    if (record.timestamps.length === 0) {
      ipTracker.delete(key);
    }
  }
}

export interface RateLimitOptions {
  windowMs: number; // e.g. 60 * 1000 (1 minute)
  maxRequests: number; // e.g. 20 requests per window
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions
): RateLimitResult {
  const now = Date.now();
  const { windowMs, maxRequests } = options;

  purgeExpired(windowMs);

  let record = ipTracker.get(identifier);
  if (!record) {
    record = { timestamps: [] };
    ipTracker.set(identifier, record);
  }

  // Filter out timestamps outside the active sliding window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= maxRequests) {
    const oldestTimestamp = record.timestamps[0];
    const resetTimeMs = oldestTimestamp + windowMs - now;
    const resetSeconds = Math.max(1, Math.ceil(resetTimeMs / 1000));

    return {
      success: false,
      limit: maxRequests,
      remaining: 0,
      resetSeconds,
    };
  }

  record.timestamps.push(now);
  const remaining = Math.max(0, maxRequests - record.timestamps.length);
  const oldestTimestamp = record.timestamps[0];
  const resetSeconds = Math.max(1, Math.ceil((oldestTimestamp + windowMs - now) / 1000));

  return {
    success: true,
    limit: maxRequests,
    remaining,
    resetSeconds,
  };
}

export function getClientIp(req: Request): string {
  const headers = req.headers;
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0].trim();
    if (firstIp) return firstIp;
  }
  return (
    headers.get("x-real-ip")?.trim() ||
    headers.get("cf-connecting-ip")?.trim() ||
    "127.0.0.1"
  );
}
