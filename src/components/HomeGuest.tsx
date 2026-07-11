import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export default function HomeGuest() {
  return (
    <div className="home-index-box guest-home">
      <div className="hm-top-log">
        <div className="hm-top-left">
          <div className="home-top">
            <img src="/assets/home-top1.png" alt="" />
          </div>
          <div className="logo-row">
            <img src="/assets/logo1.png" alt="THSEX" className="home-logo" />
          </div>
        </div>
        <div className="hm-top-right">
          <Link href={ROUTES.download} className="hm-icon-btn">
            <img src="/assets/download.png" alt="download" />
          </Link>
          <span className="hm-icon-btn">
            <img src="/assets/kefu.png" alt="support" />
          </span>
        </div>
      </div>

      <div className="home-banner">
        <img src="/assets/lb-1.png" alt="" className="home-banner-img" />
      </div>

      <div className="home-notice">
        <img src="/assets/horn.png" alt="" className="home-horn" />
        <span>Welcome to THSEX — secure digital asset trading platform</span>
      </div>

      <div className="home-shortcuts">
        {[
          { icon: "newDeposit.png", label: "Deposit" },
          { icon: "new-Withdrawal.png", label: "Withdraw" },
          { icon: "newExchange.png", label: "Flash Swap" },
          { icon: "newTradeHistory.png", label: "History" },
        ].map((s) => (
          <div key={s.label} className="home-shortcut">
            <img src={`/assets/${s.icon}`} alt="" />
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="guest-wrap">
        <div className="guest-card">
          <p className="guest-welcome">Welcome to THSEX</p>
          <p className="guest-desc">
            Start your digital asset{"\n"}trading journey
          </p>
          <img src="/assets/first-time.png" alt="" className="guest-card-image" />
        </div>

        <p className="guest-title">Trade anytime,{"\n"}anywhere</p>
        <p className="guest-subtitle">Secure · Fast · Professional</p>

        <div className="guest-actions">
          <Link href={ROUTES.login} className="guest-btn login">
            Log in
          </Link>
          <Link href={ROUTES.register} className="guest-btn register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
