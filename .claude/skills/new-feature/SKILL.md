---
name: new-feature
description: Start here for EVERY request to add, build, extend, change or redesign something in Dokko Filler (new feature, page, component, endpoint, card type, tour, setting, behavior). Before any code, gives the user a short Serbian advice block - which code pattern (docs/PATTERNS.md), where it fits in the architecture (docs/ARCHITECTURE.md), the ponytail verdict (does it need to exist / what is reused / what is skipped) and which task skill applies - then implements through that skill. Not for pure questions; for bug reports use bugfix-workflow.
---

# New feature / change: advise first, then build

The user wants this every time they ask for something new: **before writing
code, advise on pattern, architecture, ponytail and skill**, then build it the
way the advice says.

## 1. Read (quickly, only what applies)

- `docs/PATTERNS.md`: find the closest pattern (component, page with data,
  API call, feature hook, config as data, library wrapper, i18n, storage,
  tests).
- `docs/ARCHITECTURE.md`: which layer it belongs to (`pages` → `components`
  → `shared-components`; `hooks` / `api` / `utils` / `context`) and which
  existing flow it touches.
- The code it touches, end to end. Grep for something that already does it.

## 2. Ponytail verdict

Climb the ladder (PATTERNS.md §0) and decide:

- **Needed?** If the need is speculative, say so and propose the smaller thing.
- **Reuse:** the existing component, hook, util or wrapper it extends.
- **Dependency:** an installed one if possible. A new one only when it saves
  real code, and then pin the version and check its docs.
- **Skipped:** what you deliberately leave out, and when to add it.

## 3. Pick the skill

| Request is about… | Skill |
|---|---|
| a new screen, route, sidebar item | `add-page` |
| a UI component (new or extracted) | `add-component` |
| calling a backend or card-reader endpoint | `add-api-call` |
| a new card/document type from the reader | `add-card-type` |
| an onboarding tour, walkthrough, coach marks | `add-tour` |
| a Word template, placeholders, cases | `docx-template` |
| colors, spacing, typography, look and feel | `ui-design-system` |
| something broken / wrong output | `bugfix-workflow` (not this skill) |
| always, at the end | `verify-change` |

Several can apply (e.g. a page that calls an endpoint → `add-page` +
`add-api-call`). If **none** fits and the work will repeat, say that you will
add a section to PATTERNS.md or a new skill in the same change.

## 4. Advice block (send this before coding)

Write it in Serbian, short, four lines plus a plan of at most 5 bullets:

```
**Patern:** <PATTERNS.md section> – <one sentence: which shape we copy>
**Arhitektura:** <layer/folder + what it plugs into>
**Ponytail:** <reused X; not adding Y (add when Z); new dependency: none / name@version and why>
**Skill:** <skill(s)> (+ verify-change)

Plan:
- …
```

Then **continue and implement** in the same turn. Do not wait for approval
unless the advice changes what the user asked for (e.g. "this already exists",
"this needs a backend change", "this needs a new paid service"). In that case
ask one question and stop.

## 5. Build and close

- Follow the chosen skill step by step. Copy the shape from PATTERNS.md and
  use the project's real names.
- New UI text goes into both locales, the tests sit next to the file, and
  `npm run lint:fix` handles formatting.
- If the change creates a new pattern, update `docs/PATTERNS.md`,
  `docs/ARCHITECTURE.md`, CLAUDE.md or a skill **in the same change**, so the
  next request finds it.
- Finish with `verify-change`. Never commit or push.
- In the final report, say if the implementation differs from the advice
  block, and why.
