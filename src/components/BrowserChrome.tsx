"use client";

import { REAL_SITE_URL } from "@/lib/config";

type Props = {
  showCeoNote?: boolean;
};

export default function BrowserChrome({ showCeoNote = true }: Props) {
  const displayUrl = REAL_SITE_URL.replace("https://", "");

  return (
    <div className="browser-chrome">
      {showCeoNote && (
        <div className="browser-ceo-note">
          MITM demo — user sees this URL in address bar (real thsexcex.online)
        </div>
      )}
      <div className="browser-bar">
        <div className="browser-dots">
          <span />
          <span />
          <span />
        </div>
        <div className="browser-url">
          <span className="browser-lock">🔒</span>
          <span className="browser-url-text">{displayUrl}</span>
        </div>
      </div>
    </div>
  );
}
