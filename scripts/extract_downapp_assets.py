"""Extract real downapp page assets from THSEX WGT."""
import re
import shutil
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WGT = ROOT.parent.parent / "new_Apk" / "THSEX-1.0.9.wgt"
PUBLIC = ROOT / "public"
ASSETS = PUBLIC / "assets"

ASSET_PATHS = [
    "static/set/down11.png",
    "static/set/down22.png",
    "static/set/down33.png",
    "static/register/icon_downapp.png",
    "static/home/top/download.png",
    "static/register/icon_logo.png",
]

# Search app-service.js for downapp hero image
HERO_CANDIDATES = []


def main():
    ASSETS.mkdir(parents=True, exist_ok=True)
    PUBLIC.mkdir(exist_ok=True)

    with zipfile.ZipFile(WGT) as z:
        for path in ASSET_PATHS:
            try:
                data = z.read(path)
                out = ASSETS / Path(path).name
                out.write_bytes(data)
                print("ok", out.name, len(data))
            except KeyError:
                print("missing", path)

        js = z.read("app-service.js").decode("utf-8", "replace")
        chunk_path = ROOT / "scripts" / "downapp_chunk.txt"
        m = re.search(r"downapp-page.{0,6000}Install-highlight", js, re.DOTALL)
        if m:
            chunk_path.write_text(m.group(0), encoding="utf-8")
            print("chunk", len(m.group(0)))

        paths = set(re.findall(r"/static/[^\s\"']+\.(?:png|jpg|jpeg|webp)", js))
        down_paths = sorted(p for p in paths if "down" in p.lower() or "register" in p or "home/top" in p)
        (ROOT / "scripts" / "image_paths.txt").write_text("\n".join(down_paths), encoding="utf-8")
        print("paths", len(down_paths))

        # try extra hero for downapp
        for p in paths:
            if "downapp" in p or "group" in p or "phone" in p.lower():
                try:
                    data = z.read(p.lstrip("/"))
                    out = ASSETS / Path(p).name
                    out.write_bytes(data)
                    print("hero?", out.name, len(data))
                except KeyError:
                    pass

        # copy index.css
        css = z.read("pages/downapp/index.css").decode("utf-8")
        (PUBLIC / "downapp.css").write_text(css, encoding="utf-8")
        print("css ok")

    # copy apk
    apk_src = ROOT.parent / "THSEX6401.apk"
    if apk_src.exists():
        shutil.copy2(apk_src, PUBLIC / "THSEX6401.apk")
        print("apk ok")


if __name__ == "__main__":
    main()
