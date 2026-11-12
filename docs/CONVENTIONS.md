# Conventions

Read this before writing code. ESLint + Prettier enforce formatting and import
order; this file covers what tools cannot.

## Files and folders

- Feature code goes in `src/features/<feature>/`. Code used by two or more
  features goes in `src/ui/` (presentational), `src/hooks/` (generic hooks) or
  `src/lib/` (pure logic without React).
- One component per file, `PascalCase.jsx`, default export, function component
  (`const Name = (props) => ...`). The only class component is `ErrorBoundary`.
- If a component's styled-components code grows past ~30 lines, move it to
  `Name.styles.js` next to it.
- Tests sit next to the file: `name.test.js` / `Name.test.jsx`.
- Import through aliases (`~ui/EmptyState`), relative imports only inside the
  same folder (`./cardTypes`).

## Naming

- Components `PascalCase`, hooks `useThing`, constants `UPPER_SNAKE_CASE`,
  everything else `camelCase`.
- Booleans read as questions: `isMale`, `allLoaded`, `hasValue`.

## Styling

- **MUI for interactive primitives:** Button, IconButton, TextField, Dialog,
  Menu, Snackbar, Tooltip, Switch, ButtonBase/CardActionArea. Never a raw
  `<button>` styled by hand.
- **Layout and one-off visuals:** MUI `sx` for small things, styled-components
  when it is reused or long. Both receive the same theme.
- **Colors only from theme tokens:** `text.primary`, `text.secondary`,
  `divider`, `action.hover`, `background.paper`, `primary.main`,
  `alpha(theme.palette.primary.main, 0.1)`... No hex values in components.
  The one exception is document paper in the preview, which is always white.
- styled-components props that must not reach the DOM use the `$` prefix
  (`$size`, `$min`).
- Spacing follows the 8px grid (`theme.spacing(n)` / `sx={{ p: 2 }}`).
- See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).

## Data

- One module per backend domain in `src/api/<domain>.js`. It uses `httpClient`
  or `readerClient` and returns `response.data`.
- Load on mount with `useFetch(fn)`; wrap `fn` in `useCallback` if it depends on
  props/params. Use the returned `refetch` for "Pokušaj ponovo".
- For user-triggered actions, write a plain `async` handler or a feature hook
  (`useCardSlots`, `useDocumentGeneration`) that holds its own state.
- Report errors with `useNotification()` → `notify(message, 'error')`. Error
  messages already come in Serbian from the API clients. Shared copy lives in
  `constants/messages.js`.

## Screen states

Every page that loads data handles four states:

| State | Component |
|---|---|
| loading | `LoadingState` (`cards={n}` for a skeleton grid) |
| error | `EmptyState color="error"` + "Pokušaj ponovo" button |
| empty | `EmptyState` with a helpful title |
| success | the content |

Pages start with `PageHeader` (title, optional subtitle, `onBack`, `actions`).

## Accessibility

- Everything clickable is a real button (`Button`, `IconButton`, `ButtonBase`,
  `CardActionArea`) or a link. Icon-only buttons have `aria-label` (Serbian).
- No nested interactive elements (no button inside a clickable card).
- Dialogs use MUI `Dialog` (Esc, focus trap, scroll lock come for free).
- Do not use `autoFocus`.
- Disabled buttons that explain why go inside `<Tooltip><span>…</span></Tooltip>`.

## Tests

- Every bug fix gets a test that fails without the fix.
- Pure logic (`src/lib`, hooks): unit tests. Pages/components: React Testing
  Library via `test/renderWithProviders.jsx`, with the API module mocked
  (`jest.mock('~api/documents')`).
- Query by role and accessible name, not by class names.
