import re
from pathlib import Path

js = Path(
    r"C:\Users\Shehzad jutt sab\Desktop\TestCase\thsex_steal_demo\frontend_patched\extracted\app-service.js"
).read_text(encoding="utf-8", errors="replace")

# find en-US resource chunk
for m in re.finditer(r'en-US', js):
    chunk = js[m.start() : m.start() + 3000]
    if "Digital asset" in chunk or "downappInstall" in chunk:
        Path(__file__).parent.joinpath("en_chunk.txt").write_text(chunk, encoding="utf-8")
        print("found at", m.start())
        break
