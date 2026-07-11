"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";

export default function GoPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.replace(ROUTES.home), 800);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="go-loading">
      <div className="go-spinner" />
      <p className="go-text">THSEX</p>
    </div>
  );
}
