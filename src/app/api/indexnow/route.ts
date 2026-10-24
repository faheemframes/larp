import { NextRequest, NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const INDEXNOW_KEY = "4a8c88f1d7e24b1bb92f398f5a34e0a7";

export async function GET(req: NextRequest) {
  // Rate limit: max 2 requests per 10 minutes per IP
  const clientIp = getClientIp(req);
  const rateLimit = checkRateLimit(`indexnow:${clientIp}`, {
    windowMs: 10 * 60 * 1000,
    maxRequests: 2,
  });

  if (!rateLimit.success) {
    return NextResponse.json(
      {
        error: "Too many indexing requests. Please wait before triggering again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.resetSeconds),
        },
      }
    );
  }

  const baseUrl = getSiteUrl();
  const host = new URL(baseUrl).host;

  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${baseUrl}/${INDEXNOW_KEY}.txt`,
    urlList: [
      `${baseUrl}/`,
      `${baseUrl}/what-is-larp`,
      `${baseUrl}/how-to-larp`,
      `${baseUrl}/the-larp-machine`,
    ],
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      status: res.status,
      ok: res.ok,
      host,
      urlsSubmitted: payload.urlList,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to notify IndexNow" },
      { status: 500 }
    );
  }
}

