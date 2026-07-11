"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Simulates user clicking a link in SMS/Telegram.
 * Message SHOWS: thsexcex.online/.../downapp
 * Actual href: attacker's /go route → redirects to trap page.
 */
export default function GoPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.replace("/pages/downapp/index");
    }, 1200);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0f",
        color: "#fff",
        padding: 24,
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: 12, color: "#888", marginBottom: 16 }}>PENTEST DEMO — SMS link entry</p>
      <h1 style={{ fontSize: 20, marginBottom: 8 }}>Opening THSEX...</h1>
      <p style={{ color: "#aaa", fontSize: 14, maxWidth: 320 }}>
        User clicked a link that looked like the official download page. They are being sent to
        the attacker trap (same path, different domain).
      </p>
      <p style={{ marginTop: 20, color: "#00c087", fontSize: 13 }}>
        thsexcex.online/#/pages/downapp/index
      </p>
    </main>
  );
}
