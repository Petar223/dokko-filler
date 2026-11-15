---
name: bugfix-workflow
description: Workflow for fixing a bug in Dokko Filler - reproduce (preferably on /demo), find the root cause in the shared code path, write a failing test first, fix, then lint/test/build and a manual check. Use for any bug report, crash, wrong output or regression.
---

# Bug fix workflow

1. **Reproduce**
   - Contract flow bugs: reproduce on `/demo` first (no login, no reader).
     Demo data is in `src/pages/DemoPage/demoData.js`. Change a snapshot
     temporarily to trigger edge cases (missing field, odd casing, Cyrillic).
   - Reader bugs: stop the reader service to test the offline path.
   - API bugs: check the network tab. Error messages come from
     `api/axios.js` / `api/readerAxios.js`.
2. **Root cause, not symptom**: find the shared function every caller goes
   through and fix it there. Grep all callers before editing. The usual places:
   - `src/utils/*` – placeholders, filling, formatting, script
   - `src/hooks/useCardSlots.js` – card loading
   - `src/hooks/useDocumentGeneration.js` – generation
   - `src/context/AuthContext.js` – auth state
3. **Failing test first** next to the file (`*.test.js[x]`). It must fail
   without the fix. Pure logic → unit test. UI → RTL with
   `renderWithProviders` and mocked API.
4. **Fix** with the smallest change that makes the test pass. Follow
   `docs/CONVENTIONS.md`.
5. **Verify**: run the `verify-change` skill, then repeat the manual
   reproduction from step 1.
6. **Do not commit.** Never run `git commit`/`git push`; the user commits at
   the end. Report instead: what was wrong, why, how it is fixed, which test
   covers it, and the list of changed files.
