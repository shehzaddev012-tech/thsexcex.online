import { NextResponse } from "next/server";
import { REAL_DOWNLOAD_API } from "@/lib/config";

/** Passthrough — what the real THSEX server returns (unmodified) */
export async function GET() {
  try {
    const res = await fetch(REAL_DOWNLOAD_API, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    const body = await res.json();
    return NextResponse.json(body);
  } catch (e) {
    return NextResponse.json(
      { success: false, error: String(e), note: "Could not reach real API" },
      { status: 502 }
    );
  }
}
