import {
  HIJACK_APK_NAME,
  REAL_SITE_URL,
  STEAL_PANEL_URL,
} from "@/lib/config";

export default function ComparePage() {
  return (
    <main className="compare-page">
      <h1>MITM Download Attack — CEO Proof</h1>

      <p>
        Real users download from{" "}
        <a href={REAL_SITE_URL} target="_blank" rel="noreferrer">
          {REAL_SITE_URL}
        </a>
        . Attacker does <strong>not</strong> need to hack THSEX server.
      </p>

      <div className="compare-grid">
        <div className="compare-card">
          <h2>What user sees</h2>
          <ul>
            <li>Address bar: <code>thsexcex.online</code></li>
            <li>Same THSEX branding + download buttons</li>
            <li>Thinks they are on official site</li>
          </ul>
        </div>
        <div className="compare-card compare-card-danger">
          <h2>What hacker does</h2>
          <ul>
            <li>Intercepts <code>GET /api/downloadlink</code></li>
            <li>Swaps CDN APK URL → {HIJACK_APK_NAME}</li>
            <li>User installs patched app</li>
            <li>Passwords + wallets hijacked</li>
          </ul>
        </div>
      </div>

      <div className="compare-api">
        <div>
          <h3>Real API</h3>
          <a href="/api/real/downloadlink">/api/real/downloadlink</a>
        </div>
        <div>
          <h3>Poisoned API (MITM)</h3>
          <a href="/api/proxy/downloadlink">/api/proxy/downloadlink</a>
        </div>
      </div>

      <div className="compare-actions">
        <a href="/pages/downapp/index" className="ceo-cta">
          Live MITM demo →
        </a>
        <a href={STEAL_PANEL_URL} target="_blank" rel="noreferrer" className="ceo-cta ceo-cta-outline">
          Steal panel →
        </a>
      </div>
    </main>
  );
}
