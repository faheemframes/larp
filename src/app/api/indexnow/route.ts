import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site";

const INDEXNOW_KEY = "4a8c88f1d7e24b1bb92f398f5a34e0a7";

export async function GET() {
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
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to notify IndexNow", details: String(error) },
      { status: 500 }
    );
  }
}
