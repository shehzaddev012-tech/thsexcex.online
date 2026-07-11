import Link from "next/link";
import { ROUTES } from "@/lib/routes";

/** Exact guest home from THSEX app render (pages/tabBar/home/index) */
export default function HomeGuest() {
  return (
    <div className="home-index-box guest-home page">
      <div className="hm-top-log flex-between">
        <div className="left flex-between">
          <div className="home-top flex-center">
            <img src="/assets/top.png" alt="" />
          </div>
        </div>
        <div className="right flex">
          <div className="kf flex-center">
            <img src="/assets/kefu.png" alt="" />
          </div>
        </div>
      </div>

      <div className="guest-wrap">
        <div className="guest-card">
          <span className="guest-welcome">Welcome</span>
          <span className="guest-desc">
            Buy, sell and manage hundreds
            <br />
            of cryptocurrencies
          </span>
          <img src="/assets/home-top2.png" alt="" className="guest-card-image" />
        </div>

        <span className="guest-title">
          A new journey
          <br />
          starts with COIN
        </span>
        <span className="guest-subtitle">Start your digital currency journey</span>

        <div className="guest-actions flex-between">
          <Link href={ROUTES.login} className="login guest-btn">
            Log In
          </Link>
          <Link href={ROUTES.register} className="register guest-btn">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
