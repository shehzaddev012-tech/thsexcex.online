"use client";

import { useState } from "react";
import {
  HIJACK_APK_NAME,
  HIJACK_APK_PATH,
  HIJACK_WALLET,
  REAL_DOWNLOAD_API,
  REAL_SITE_URL,
  STEAL_PANEL_URL,
} from "@/lib/config";

const STEPS = [
  {
    n: 1,
    title: "User opens official download page",
    body: `Victim opens ${REAL_SITE_URL} — address bar shows real thsexcex.online.`,
    link: "/pages/downapp/index",
    linkLabel: "Open live MITM demo →",
  },
  {
    n: 2,
    title: "App requests download link from API",
    body: `Page calls GET ${REAL_DOWNLOAD_API}. Returns official CDN APK URL.`,
    link: "/api/real/downloadlink",
    linkLabel: "View real API JSON →",
  },
  {
    n: 3,
    title: "Hacker poisons API response (MITM)",
    body: "On public WiFi / compromised network, attacker intercepts JSON and replaces android URL with hijack APK.",
    link: "/api/proxy/downloadlink",
    linkLabel: "View poisoned API JSON →",
  },
  {
    n: 4,
    title: "User downloads hijack APK",
    body: `User taps Download — gets ${HIJACK_APK_NAME} (patched build), not official app.`,
    link: HIJACK_APK_PATH,
    linkLabel: `Download ${HIJACK_APK_NAME} →`,
  },
  {
    n: 5,
    title: "Login — password stolen",
    body: "Patched app sends plain-text password to attacker server BEFORE real THSEX login API.",
    link: STEAL_PANEL_URL,
    linkLabel: "Open Railway steal panel →",
  },
  {
    n: 6,
    title: "Deposit & withdraw hijacked",
    body: `Deposit screen shows hacker wallet ${HIJACK_WALLET}. Withdraw POST body swapped to same address.`,
    link: STEAL_PANEL_URL,
    linkLabel: "See hijack logs on panel →",
  },
];

export default function CeoPage() {
  const [openStep, setOpenStep] = useState(1);

  return (
    <main className="ceo-page">
      <header className="ceo-header">
        <p className="ceo-badge">OWNER PENTEST — LIVE PROOF</p>
        <h1>THSEX Full Attack Chain</h1>
        <p className="ceo-sub">
          End-to-end demo: real official URL → poisoned download API → hijack APK → password steal →
          wallet hijack. No dummy data.
        </p>
      </header>

      <section className="ceo-quick">
        <a href="/pages/downapp/index" className="ceo-cta">
          Start live demo (CEO call)
        </a>
        <a href={STEAL_PANEL_URL} target="_blank" rel="noreferrer" className="ceo-cta ceo-cta-outline">
          Steal + hijack panel
        </a>
      </section>

      <section className="ceo-steps">
        {STEPS.map((s) => (
          <article
            key={s.n}
            className={`ceo-step ${openStep === s.n ? "open" : ""}`}
            onClick={() => setOpenStep(s.n)}
          >
            <div className="ceo-step-num">{s.n}</div>
            <div className="ceo-step-body">
              <h2>{s.title}</h2>
              <p>{s.body}</p>
              <a
                href={s.link}
                target={s.link.startsWith("http") ? "_blank" : undefined}
                rel={s.link.startsWith("http") ? "noreferrer" : undefined}
                className="ceo-step-link"
                onClick={(e) => e.stopPropagation()}
              >
                {s.linkLabel}
              </a>
            </div>
          </article>
        ))}
      </section>

      <section className="ceo-call-script">
        <h2>CEO call script (2 min)</h2>
        <ol>
          <li>Open /pages/downapp/index on phone — show address bar says thsexcex.online</li>
          <li>Show CEO panel: real CDN URL vs hijack APK URL side by side</li>
          <li>Tap Download Android → install THSEX6401.apk</li>
          <li>Login with test account → open Railway panel, password visible plain text</li>
          <li>Open deposit → address is {HIJACK_WALLET}</li>
          <li>
            One-liner: &quot;On compromised network your real download page serves my APK. After
            install I steal passwords and redirect funds.&quot;
          </li>
        </ol>
      </section>

      <section className="ceo-alt">
        <h3>Alternative vectors (also real)</h3>
        <ul>
          <li>
            <a href="/go">SMS phishing entry</a> — link looks official, lands on trap
          </li>
          <li>
            <a href="/iframe">Iframe clickjacking</a> — real site embedded, overlay steals click
          </li>
          <li>
            <a href="/compare">Compare real vs attack</a>
          </li>
        </ul>
      </section>
    </main>
  );
}
