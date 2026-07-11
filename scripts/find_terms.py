from pathlib import Path
js = Path(r"C:\Users\Shehzad jutt sab\Desktop\TestCase\thsex_steal_demo\frontend_patched\extracted\app-service.js").read_text(encoding="utf-8", errors="replace")
for term in ["开启数字货币交易", "Digital asset trading", "New route", "新航线", "Start digital"]:
    i = js.find(term)
    out = f"{term}: {i}\n"
    if i >= 0:
        out += js[i:i+200] + "\n"
    Path(__file__).parent.joinpath("terms.txt").open("a", encoding="utf-8").write(out)
