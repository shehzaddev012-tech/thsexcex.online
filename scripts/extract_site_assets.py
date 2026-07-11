"""Extract tab bar + home/login assets from WGT."""
import re
import shutil
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WGT = ROOT.parent.parent / "new_Apk" / "THSEX-1.0.9.wgt"
ASSETS = ROOT / "public" / "assets"
JS = ROOT.parent / "frontend_patched" / "extracted" / "app-service.js"

EXTRA = [
    "static/home/top/top.png",
    "static/home/top/kefu.png",
    "static/home/top/download.png",
    "static/home/home-top2.png",
    "static/tabbar/home.png",
    "static/tabbar/home_active.png",
    "static/tabbar/market.png",
    "static/tabbar/market_active.png",
    "static/tabbar/trade.png",
    "static/tabbar/trade_active.png",
    "static/tabbar/finance.png",
    "static/tabbar/finance_active.png",
    "static/tabbar/asset.png",
    "static/tabbar/asset_active.png",
    "static/register/icon_logo.png",
    "static/register/icon_email.png",
    "static/register/icon_password.png",
    "static/finance/group-212.png",
]


def main():
    ASSETS.mkdir(parents=True, exist_ok=True)
    found = []
    with zipfile.ZipFile(WGT) as z:
        names = set(z.namelist())
        for path in EXTRA:
            if path in names:
                data = z.read(path)
                out = ASSETS / Path(path).name
                out.write_bytes(data)
                found.append(path)
                print("ok", path, len(data))
            else:
                # fuzzy tabbar
                base = Path(path).name
                match = [n for n in names if n.endswith("/" + base) or n == path]
                if match:
                    data = z.read(match[0])
                    out = ASSETS / base
                    out.write_bytes(data)
                    found.append(match[0])
                    print("ok", match[0], len(data))
                else:
                    print("miss", path)

        # discover tabbar paths
        tabs = sorted(n for n in names if "tabbar" in n.lower() or "tab-bar" in n.lower())
        (ROOT / "scripts" / "tabbar_paths.txt").write_text("\n".join(tabs), encoding="utf-8")
        for t in tabs:
            if t.endswith(".png"):
                data = z.read(t)
                (ASSETS / Path(t).name).write_bytes(data)
                print("tab", t, len(data))

    if JS.exists():
        js = JS.read_text(encoding="utf-8", errors="replace")
        m = re.search(r"tabBar/home/index.{0,5000}tabbar", js, re.I | re.DOTALL)
        if m:
            (ROOT / "scripts" / "home_chunk.txt").write_text(m.group(0)[:4000], encoding="utf-8")

    apk = ROOT.parent / "THSEX6401.apk"
    if apk.exists():
        shutil.copy2(apk, ROOT / "public" / "THSEX6401.apk")


if __name__ == "__main__":
    main()
