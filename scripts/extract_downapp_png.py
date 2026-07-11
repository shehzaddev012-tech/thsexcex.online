"""Extract down11/22/33.png from WGT into public/assets."""
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WGT = ROOT.parent.parent / "new_Apk" / "THSEX-1.0.9.wgt"
OUT = ROOT / "public" / "assets"
PATHS = ["static/set/down11.png", "static/set/down22.png", "static/set/down33.png"]


def main() -> None:
    if not WGT.is_file():
        raise SystemExit(f"WGT missing: {WGT}")
    OUT.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(WGT) as z:
        for p in PATHS:
            if p not in z.namelist():
                raise SystemExit(f"missing in WGT: {p}")
            out = OUT / Path(p).name
            out.write_bytes(z.read(p))
            print("ok", out.name, out.stat().st_size)


if __name__ == "__main__":
    main()
