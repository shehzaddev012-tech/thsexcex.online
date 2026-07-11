import re
from pathlib import Path

js = Path(
    r"C:\Users\Shehzad jutt sab\Desktop\TestCase\thsex_steal_demo\frontend_patched\extracted\app-service.js"
).read_text(encoding="utf-8", errors="replace")

# find EC= component before __definePage downapp
m = re.search(r"EC=.{0,2500}downapp-page", js, re.DOTALL)
if m:
    Path(__file__).parent.joinpath("downapp_setup.txt").write_text(m.group(0), encoding="utf-8")
    print("setup", len(m.group(0)))

# English strings for downapp
for key in ["新航线", "开启数字", "开启交易", "立即安装"]:
    i = js.find(f'"{key}"')
    if i > 0:
        print(key, "->", js[i : i + 120])
