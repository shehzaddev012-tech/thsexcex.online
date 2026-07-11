from pathlib import Path
js = Path(r"C:\Users\Shehzad jutt sab\Desktop\TestCase\thsex_steal_demo\frontend_patched\extracted\app-service.js").read_text(encoding="utf-8", errors="replace")
out = []
idx = 0
while True:
    i = js.find("homeGuestWelcome", idx)
    if i < 0:
        break
    out.append(js[i:i+250])
    out.append("---")
    idx = i + 1
Path(__file__).parent.joinpath("home_en_out.txt").write_text("\n".join(out), encoding="utf-8")
