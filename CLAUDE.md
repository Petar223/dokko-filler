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
| `npm run lint:fix` | Same, and fixes formatting (single quotes, import order) |
| `npm run template:check -- file.docx` | Lists placeholders of a Word template and flags problems |

After every change: `npm run lint:fix && npm run lint && npm test && npm run build` (see the `verify-change` skill).

**Every request to add or change something starts with the `new-feature`
skill:** before writing code, give the user a short advice block (pattern from
[docs/PATTERNS.md](docs/PATTERNS.md), place in the architecture, ponytail verdict,
which skill), then build it through that skill. Bugs go through `bugfix-workflow`.

**Never run `git commit`, `git push` or open a PR.** The user commits at the end
themselves. Leave changes uncommitted in the working tree and list them in the
final report.

## Where things live

Aliases (defined once in `aliases.js`, shared by webpack, Jest and ESLint):
`~components`, `~shared-components`, `~pages`, `~hooks`, `~api`, `~context`, `~utils`.
`src/theme/` and `src/GlobalStyle/` have no alias (import them relatively).

Every component lives in its own folder: `<Name>/<Name>.jsx`.

- `src/pages/` – one folder per route (HomePage, AboutPage, DemoPage, DocumentsList, GenerateDocumentPage, PageNotFound); page-only data/constants sit next to the page (`demoData.js`, `consts.js`)
- `src/components/` – app-level and stateful components: Root (routes), Layout, Header, Sidebar, Footer, Profile, PrivateRoute, ErrorBoundary, ThemeProvider, AppTour (the only react-joyride wrapper), WelcomeTour, Authentication (Login, Signup, ConfirmSignup), DocumentWorkspace, DocumentRender, PlaceholderCard, DocumentModal, DocxViewer, `Icons/` (svgr)
- `src/shared-components/` – reusable presentational components (PageHeader, EmptyState, LoadingState, FieldList, Icon, PasswordField, DocumentItem, LoadedCard, SwitchThemeButton, LanguageSwitch); plain styled wrappers in `shared-styled-components/`
- `src/context/` – `AuthContext`, `NotificationContext`
- `src/hooks/` – `useFetch`, `useCardSlots`, `useDocumentGeneration`, `useTour`
- `src/api/` – `axios.js` (backend, adds Cognito token), `readerAxios.js` (local card reader), one file per endpoint
- `src/utils/` – Cognito wrapper, document logic (placeholders, fill, script conversion, formatting, download), `routes.js`, `i18n.js` (i18next setup), `tour.js` (tour targets), `validation.js`
- `src/locales/` – `sr.json` and `en.json`: every piece of UI copy, same keys in both
- `src/theme/` – palette, typography, MUI overrides, `theme.js` (`buildTheme`, `useColorMode`)

## Docs

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) – data flow, auth, API clients, state
- [docs/PATTERNS.md](docs/PATTERNS.md) – code patterns with real examples (how code looks here)
- [docs/CONVENTIONS.md](docs/CONVENTIONS.md) – rules: where files go, naming, styling, a11y, tests
- [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) – tokens, shared-components catalog, dark mode rules
- [docs/DOCX_TEMPLATES.md](docs/DOCX_TEMPLATES.md) – placeholder syntax for Word templates

Task-specific workflows are in `.claude/skills/`: `new-feature` (entry point
for any new work), add-page, add-component, add-api-call, add-card-type,
add-tour, docx-template, ui-design-system, bugfix-workflow, verify-change.

## Gotchas

- `.env-cmdrc` is required for `npm start` and is gitignored. Only the variables
  whitelisted in `webpack.config.js` (`PUBLIC_ENV`) reach the bundle; never
  expose `process.env` as a whole.
- Anything in the bundle is public. `CASE_API_KEY` is not a secret.
- `/demo` runs the whole flow without login and without a card reader (mock data
  + `public/assets/demo/demo-contract.docx`). Use it to reproduce and verify.
- UI text is never hard-coded: add the key to both `src/locales/sr.json`
  (Serbian, Latin script; the default) and `src/locales/en.json`, then use
  `t('key')` from `useTranslation()` (or `i18n.t` outside components). Generated
  contracts and card data are not translated. Code, comments and docs are English.
- Card data keys are `<Field>_<order>` (e.g. `GivenName_1`); `order` comes from
  the contract's `needed_cards`.
- Placeholders must be exactly `{{Name}}` with no spaces, otherwise
  `patchDocument` will not replace them.
- Paper in the preview is always white, also in dark mode.
- Product tours: react-joyride **v3** (not v2 API), always through `AppTour`;
  targets are `data-tour="<id>"` attributes. See the `add-tour` skill.
