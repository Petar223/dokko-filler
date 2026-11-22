# Architecture

## Folder structure

The code is organised by **role**: what a file is (page, component, context,
hook, API call, util) decides where it lives. Each component has its own folder.

```
src/
  index.js                 providers: ThemeProvider > ErrorBoundary > AuthProvider > NotificationProvider > Root
  GlobalStyle/             global CSS (styled-components)
  pages/                   one folder per route
    HomePage/  AboutPage/  PageNotFound/
    DocumentsList/         contract list (/documents)
    GenerateDocumentPage/  contract details + card slots (/documents/:id/create)
      consts.js            card types, labels, detection; cardFields.json
    DemoPage/              demo flow (/demo) + demoData.js (mock contract/cards),
                           demoTours.js (demo tour steps)
  components/              app-level and stateful components
    Root/                  router + routes
    Layout/ Header/ Sidebar/ Footer/ Profile/
    PrivateRoute/ ErrorBoundary/ ThemeProvider/
    AppTour/               the only react-joyride wrapper + TourTooltip/
    WelcomeTour/           app tour after the first login (rendered by Profile)
    Authentication/        Login, Signup, ConfirmSignup, AuthCard
    DocumentWorkspace/     card slots + preview button (shared by real and demo flow)
    DocumentRender/        one slot: PlaceholderCard or LoadedCard
    PlaceholderCard/       empty slot button
    DocumentModal/         full-screen preview dialog
    DocxViewer/            docx-preview renderer
    Icons/                 svgr icon components
  shared-components/       reusable presentational components
    PageHeader/ EmptyState/ LoadingState/ FieldList/ Icon/ PasswordField/
    DocumentItem/ LoadedCard/ SwitchThemeButton/
    shared-styled-components/CardGrid/
  context/                 AuthContext, NotificationContext
  hooks/                   useFetch, useCardSlots, useDocumentGeneration, useTour
  api/                     axios.js, readerAxios.js + one file per endpoint
  utils/                   cognitoAuth, documentUtils, placeholders, formatters,
                           scriptConversion, fileDownloader, routes, i18n, tour, validation
  locales/                 sr.json, en.json (all UI copy)
  theme/                   palette, typography, components (MUI overrides), theme.js
```

Dependency direction: `pages` → `components` → `shared-components`;
any of them may use `context`, `hooks`, `api`, `utils`. `shared-components`
never import from `pages` or call the API, except `LoadedCard`, which reads
card type metadata from `pages/GenerateDocumentPage/consts.js`.

## Data flow (real contract)

```
Login ── signIn (Cognito) ──► AuthContext { user, status }
    │
DocumentsList ── GET GetListOfDocs ──► [{ id, name }]
    │ navigate /documents/:id/create
GenerateDocumentPage ── GET /document?id ──► { name, letter, needed_cards, document_url_docx }
    │
DocumentWorkspace
    ├─ useCardSlots(readFn)
    │     click slot ─► GET /read (card reader) ─► snapshot { GivenName, Surname, ... }
    │     detectCardType(snapshot) must match slot type
    │     fields = { GivenName_1, Surname_1, ..., RegistrationNumberOfVehicle_3 }
    │
    └─ useDocumentGeneration({ templateURL, fields, letter })
          fetchTemplate(document_url_docx)            (S3 signed URL, checked response.ok)
          extractText (mammoth raw text) ─► placeholder names
          addCustomFields: script conversion (letter 1 = Latin, else Cyrillic),
                           name_N = GivenName_N + Surname_N, date
          getCaseRequests: {{Field_pK_N}} ─► POST /case { noun, case } ─► inflected value
          fillDocument (docx patchDocument) ×2: clean blob + highlighted blob
          getMissingFields: placeholders without a value
    │
DocumentModal ── docx-preview renderAsync(previewBlob) ─► pages
    └─ "Preuzmi .docx" ─► downloadBlob(downloadBlob)
```

The demo flow (`/demo`) uses the same `DocumentWorkspace`, with
`mockReadCard(order)` instead of the reader and a static template from
`public/assets/demo/`.


## Auth

- `utils/cognitoAuth.js` configures Amplify once and wraps every
  Cognito call (`signInUser`, `signUpUser`, `confirmSignUpUser`, `resendCode`,
  `signOutUser`, `getIdToken`, `getCurrentUserEmail`).
- `AuthContext` is the single source of truth:
  `{ user, status: 'loading' | 'authenticated' | 'anonymous', login, logout }`.
  `login()` re-reads the current user from Cognito; call it after a successful
  `signInUser`.
- `PrivateRoute` waits while `status === 'loading'`, otherwise redirects
  anonymous users to `/login` with `state.from`, so login can send them back.
- Signup → `/confirm-signup?email=` (code from email) → login.
- `api/axios.js` adds the Cognito ID token to every request. A 401 signs the user
  out and redirects to `/login?from=<current path>`.

## API clients

| Client | Base URL | Errors |
|---|---|---|
| `api/axios.js` | `API_BASE_URL` | Rejects with `Error` whose `message` is translated (`http.*` keys) and `status` |
| `api/readerAxios.js` | `READER_API_BASE_URL` | Rejects with `reader.offline` when the reader is not running, otherwise `reader.readFailed` (translated) |

Domain modules (`getDocuments.js`, `getDocumentById.js`, `read.js`, `postPlaceholder.js`) return
`response.data` (or the relevant part of it) and never touch UI state.

## State

There is no global store. State lives where it is used:

| State | Where |
|---|---|
| Auth user | `AuthContext` |
| Color mode | `ThemeProvider` (persisted in `localStorage`) |
| Notifications | `NotificationProvider` (`useNotification()` → `notify(msg, severity, ms)`) |
| Server data for a page | `useFetch(fn)` → `{ data, loading, error, refetch }` |
| Loaded cards | `useCardSlots` (per workspace) |
| Generated documents | `useDocumentGeneration` (per workspace, template cached by URL) |

## Error handling

- Expected failures (network, reader offline, template expired) → `notify(...)`
  and/or an `EmptyState` with a retry action.
- Render errors → `ErrorBoundary`. One wraps the whole app; another sits in
  `Layout` around the page and resets on navigation, so header and sidebar stay usable.

## Build

- `webpack.config.js` (common) + `webpack.dev.js` / `webpack.prod.js`, chosen
  by `NODE_ENV`. Babel config is in `babel.config.js` (shared with Jest).
- Only variables in `PUBLIC_ENV` are inlined via `DefinePlugin`.
- `docx-preview` is loaded with `import()` only when a preview opens.

## Languages (i18n)

- `src/utils/i18n.js` initialises i18next + react-i18next with two bundled
  languages: `sr` (default and fallback) and `en`. It is imported once in
  `src/index.js` and in `jest.setup.js` (tests run in Serbian).
- Copy lives in `src/locales/sr.json` and `src/locales/en.json`, grouped by
  area (`auth`, `documents`, `preview`, `tutorial`, ...). Both files must have
  the same keys; `LanguageSwitch.test.jsx` fails when they differ.
- Components call `t('key')` from `useTranslation()`. Non-React code (API
  clients, hooks, validation, `ErrorBoundary`) calls `i18n.t('key')` at the
  moment the message is needed, never at module load.
- Counts use i18next plurals: `key_one`, `key_few` (Serbian only), `key_other`.
- `LanguageSwitch` in the header toggles the language. The choice is stored in
  `localStorage` (`dokko-language`) and sets `<html lang>`.
- Not translated: generated contracts, card data from the reader, and names
  that come from the backend (contract names, `needed_cards` names).

## Product tours (react-joyride v3)

```
Profile ── useTour('welcome:<email>', autoStart) ──► WelcomeTour ──► AppTour
                                                       └─ finished ─► /demo
DocumentsList ── useTour('documents') ──► AppTour (first contract, reader)
DocumentWorkspace ── useTour(tourName) ──► AppTour (cards, progress, preview)
    tourName: 'workspace' (real flow) | 'demoWorkspace' (demo copy)
DocumentModal ── useTour('preview') ──► AppTour aboveDialogs (zoom, highlight,
                                         download), rendered next to the Dialog
DemoPage ── useTour('demo-list') ──► AppTour (demo intro, demo contract)
AppTour ── <Joyride> + TourTooltip (MUI), copy from tour.<name>.<stepId>.*
```

- `AppTour` is the only component that renders `<Joyride>`. It applies theme
  colors and z-index, the locale, the buttons, and makes X/Esc end the tour.
- Step lists are data (`{ id, target, placement }`) next to their owner;
  targets are `data-tour="<id>"` attributes (`utils/tour.js` → `tourTarget`).
- `useTour(id, { autoStart })` returns `{ run, start, end }`. A tour that
  ends (finished or skipped) is stored as seen in `localStorage`
  (`dokko-tour:<id>`), so it auto-starts only once per browser; `start()`
  replays it (user menu → "Vodič kroz aplikaciju"; "Pokreni vodič" in the
  header of the contract list, workspace and demo; ⓘ in the preview toolbar).
- Each screen has its own short tour instead of one tour spanning routes, so
  no controlled `stepIndex` is needed. How to add one: `add-tour` skill.
