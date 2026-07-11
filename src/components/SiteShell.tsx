"use client";

import { usePathname } from "next/navigation";
import TabBar from "./TabBar";
import { NO_TAB_PATHS } from "@/lib/routes";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showTab = !NO_TAB_PATHS.some((p) => pathname === p || pathname.startsWith(p));

  return (
    <div className={`site-shell ${showTab ? "with-tab" : ""}`}>
      <main className="site-main">{children}</main>
      {showTab && <TabBar />}
    </div>
  );
}
