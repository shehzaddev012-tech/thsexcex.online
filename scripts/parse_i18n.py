import re
from pathlib import Path

js = Path(
    r"C:\Users\Shehzad jutt sab\Desktop\TestCase\thsex_steal_demo\frontend_patched\extracted\app-service.js"
).read_text(encoding="utf-8", errors="replace")

pairs = re.findall(r'"([^"]{2,40})":"([^"]{2,80})"', js)
keys = [
    "开启数字货币交易",
    "数字货币交易",
    "新航线",
    "数字货币交易 - 轻松上手，简单无忧",
    "downappInstallCta",
    "downappInstallCtaHighlight",
    "立即安装，即刻",
    "开启交易",
    "THSEX",
]
out = []
for k in keys:
    for a, b in pairs:
        if a == k:
            out.append(f"{k} => {b}")
            break
Path(__file__).parent.joinpath("i18n_en.txt").write_text("\n".join(out), encoding="utf-8")
print("\n".join(out))
