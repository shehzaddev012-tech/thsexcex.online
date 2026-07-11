import re
import sys
from pathlib import Path

js = Path(r"C:\Users\Shehzad jutt sab\Desktop\TestCase\thsex_steal_demo\frontend_patched\extracted\app-service.js").read_text(
    encoding="utf-8", errors="replace"
)

# Find downapp component render - look for hero-title and icon_downapp nearby
idx = js.find("icon_downapp")
print("icon_downapp at", idx)
if idx > 0:
    print(js[idx - 500 : idx + 1500])

# all src near downapp-page
for m in re.finditer(r"downapp-page", js):
    start = m.start()
    chunk = js[start : start + 4000]
    if "hero" in chunk and "download" in chunk:
        out = Path(__file__).parent / "downapp_render.txt"
        out.write_text(chunk, encoding="utf-8")
        print("wrote render chunk", len(chunk))
        break
