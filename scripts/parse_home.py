import re
from pathlib import Path

js = Path(
    r"C:\Users\Shehzad jutt sab\Desktop\TestCase\thsex_steal_demo\frontend_patched\extracted\app-service.js"
).read_text(encoding="utf-8", errors="replace")

m = re.search(r"home-index-box.{0,8000}guest-actions", js, re.DOTALL)
if m:
    Path(__file__).parent.joinpath("home_render.txt").write_text(m.group(0)[:6000], encoding="utf-8")
    print("ok", len(m.group(0)))
