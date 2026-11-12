# Dokko Filler

React 18 + webpack 5 SPA (plain JS, no TypeScript) that fills Word contract
templates with data read from Serbian ID cards and vehicle registration cards.

Flow: Cognito login → contract list (API) → read cards from the local card
reader → fill the `.docx` template (`docx.patchDocument`, grammatical cases via
`POST /case`, Latin/Cyrillic conversion) → preview (`docx-preview`) → download.

## Commands

| Command | What it does |
|---|---|
| `npm start` | Dev server on :3000; needs `.env-cmdrc` (copy `.env-cmdrc.example`) |
| `npm run build` | Production build into `build/`; env vars must be in the shell (`npx env-cmd -e <profile> npm run build`) |
| `npm test` | Jest + React Testing Library |
| `npm run lint` | ESLint (prettier, react-hooks, a11y, import order) |
| `npm run template:check -- file.docx` | Lists placeholders of a Word template and flags problems |

Before committing: `npm run lint && npm test && npm run build` (see the `verify-change` skill).

## Where things live

Aliases (defined once in `aliases.js`, shared by webpack, Jest and ESLint):
`~app`, `~api`, `~features`, `~ui`, `~theme`, `~hooks`, `~lib`, `~constants`.

- `src/app/` – shell: Root (routes), Layout, Header, Sidebar, Footer, PrivateRoute, ErrorBoundary, Notifications
- `src/api/` – `httpClient` (backend, adds Cognito token), `readerClient` (local card reader), one file per domain
- `src/features/<feature>/` – pages and feature components (auth, documents, generate, preview, demo, static)
- `src/ui/` – reusable presentational components + `Icons/` (svgr)
- `src/theme/` – palette, typography, MUI overrides, `ColorModeProvider`
- `src/lib/document/` – pure document logic (placeholders, fill, script conversion, formatting, download)
- `src/constants/` – `routes.js`, `messages.js` (shared Serbian UI copy)

## Docs

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) – data flow, auth, API clients, state
- [docs/CONVENTIONS.md](docs/CONVENTIONS.md) – how to write code here (read before changing code)
- [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) – tokens, `ui/` catalog, dark mode rules
- [docs/DOCX_TEMPLATES.md](docs/DOCX_TEMPLATES.md) – placeholder syntax for Word templates

Task-specific workflows are in `.claude/skills/` (add-page, add-component,
add-api-call, add-card-type, docx-template, ui-design-system, bugfix-workflow,
verify-change).

## Gotchas

- `.env-cmdrc` is required for `npm start` and is gitignored. Only the variables
  whitelisted in `webpack.config.js` (`PUBLIC_ENV`) reach the bundle; never
  expose `process.env` as a whole.
- Anything in the bundle is public. `CASE_API_KEY` is not a secret.
- `/demo` runs the whole flow without login and without a card reader (mock data
  + `public/assets/demo/demo-contract.docx`). Use it to reproduce and verify.
- UI text is Serbian (Latin script). Code, comments and docs are English.
- Card data keys are `<Field>_<order>` (e.g. `GivenName_1`); `order` comes from
  the contract's `needed_cards`.
- Placeholders must be exactly `{{Name}}` with no spaces, otherwise
  `patchDocument` will not replace them.
- Paper in the preview is always white, also in dark mode.
