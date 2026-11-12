---
name: verify-change
description: Verification checklist before committing or opening a PR in Dokko Filler - lint, tests, production build, bundle leak check, manual demo flow in light and dark mode. Use before every commit/PR or when asked to verify a change.
---

# Verify a change

## 1. Automated (all must pass)

```bash
npm run lint      # 0 errors (warnings: fix the ones in files you touched)
npm test          # all green
npm run build     # build/index.html must exist
```

## 2. Bundle leak check

```bash
grep -rlE "HOME=|PATH=|USERPROFILE|AWS_SECRET|aws_secret" build/js
```

It must print nothing. If it finds something, someone exposed `process.env`.
Only `PUBLIC_ENV` in `webpack.config.js` may reach the bundle.

## 3. Manual (`npm start`)

Demo flow on `/demo` (no login, no reader):
- [ ] Pick the demo contract and load the three cards. Only the clicked slot
      shows loading. Other slots are disabled while one is reading.
- [ ] "Pregledaj dokument" is disabled until all cards are loaded (tooltip explains).
- [ ] Preview: A4 pages, page count, zoom −/+, "Prilagodi širini",
      highlight toggle, Esc closes.
- [ ] "Preuzmi .docx" downloads a file that looks the same in Word.

Theme:
- [ ] Toggle dark/light on every page you touched. Reload: the mode is kept.

If you touched auth/API:
- [ ] Opening `/documents` while logged out goes to login, then back after login.
- [ ] Logout, then login again: the avatar shows without a refresh.
- [ ] Reader stopped: clear "čitač nije dostupan" message, no crash.

## 4. Report

State what was run and the result. If something could not be checked (e.g.
no reader or no backend access), say so explicitly.
