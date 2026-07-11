"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** SMS / Telegram link entry — user thinks official site is opening */
export default function GoPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.replace("/pages/downapp/index"), 800);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="go-loading">
      <div className="go-spinner" />
      <p className="go-text">THSEX</p>
    </div>
  );
}
