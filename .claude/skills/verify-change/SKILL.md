---
name: verify-change
description: Verification checklist after finishing a change in Dokko Filler - lint, tests, production build, bundle leak check, manual demo flow in light and dark mode. Use when a change is done or when asked to verify a change. Never commits; the user commits.
---

# Verify a change

**Never run `git commit`, `git push` or open a PR.** The user commits at the
end. This skill only verifies and reports.

## 1. Automated (all must pass)

```bash
npm run lint:fix  # always first: formats every file (single quotes, import order)
npm run lint      # 0 errors and 0 warnings
npm test          # all green
npm run build     # build/index.html must exist
```

Formatting is never done by hand. Strings use single quotes (`.prettierrc`);
`npm run lint:fix` rewrites quotes, line breaks and import order after every
change, including in files written by a script.

Then check the editor: ask VS Code for its diagnostics (Problems panel). It
must show nothing for the files you touched. If it underlines quotes
(`Replace '...' with "..."`) or `~alias` imports while `npm run lint` is
clean, the files are fine and the editor's ESLint server is stale (it was
started before `.prettierrc`, `.eslintrc.js` or `aliases.js` changed). Restart
it: Command Palette → "ESLint: Restart ESLint Server". Never switch the code
to double quotes to silence it.

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

State what was run and the result, and list the changed files
(`git status --short`) so the user can review and commit them. If something could not be checked (e.g.
no reader or no backend access), say so explicitly.
