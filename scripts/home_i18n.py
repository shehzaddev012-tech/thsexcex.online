from pathlib import Path
js = Path(r"C:\Users\Shehzad jutt sab\Desktop\TestCase\thsex_steal_demo\frontend_patched\extracted\app-service.js").read_text(encoding="utf-8", errors="replace")
keys = ["homeGuestWelcome","homeGuestIntro","homeGuestTitle","homeGuestSubtitle","homeStartAccount","homeStartDeposit"]
for k in keys:
    i = js.find(k)
    if i > 0:
        chunk = js[i:i+120]
        Path(__file__).parent.joinpath("home_i18n.txt").open("a", encoding="utf-8").write(k + ": " + chunk + "\n")
