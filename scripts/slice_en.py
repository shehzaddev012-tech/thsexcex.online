from pathlib import Path
js = Path(r"C:\Users\Shehzad jutt sab\Desktop\TestCase\thsex_steal_demo\frontend_patched\extracted\app-service.js").read_text(encoding="utf-8", errors="replace")
chunk = js[137200:138200]
Path(__file__).parent.joinpath("en_downapp.txt").write_text(chunk, encoding="utf-8")
print("ok", len(chunk))
