"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TABS } from "@/lib/routes";

export default function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="site-tabbar">
      {TABS.map((tab) => {
        const active = pathname === tab.href || pathname.startsWith(tab.href);
        return (
          <Link key={tab.id} href={tab.href} className={`site-tab ${active ? "active" : ""}`}>
            <img src={`/assets/${active ? tab.active : tab.icon}`} alt="" className="site-tab-icon" />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
