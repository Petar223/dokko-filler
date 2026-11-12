# Conventions

Read this before writing code. ESLint + Prettier enforce formatting and import
order; this file covers what tools cannot.

## Files and folders

Where a new file goes:

| What | Where |
|---|---|
| A routed page | `src/pages/<Name>/<Name>.jsx` (+ page-only `consts.js` / data next to it) |
| App-level or stateful component (layout, flows, dialogs) | `src/components/<Name>/<Name>.jsx` |
| Reusable presentational component | `src/shared-components/<Name>/<Name>.jsx` |
| Plain styled wrapper (no logic) | `src/shared-components/shared-styled-components/<Name>/<Name>.jsx` |
| React context + provider | `src/context/<Name>Context.js` |
| Hook | `src/hooks/use<Name>.js` |
| Backend / reader call | `src/api/<functionName>.js` (one function, default export) |
| Pure logic, constants, helpers | `src/utils/<name>.js` |
| Theme tokens | `src/theme/` |

- Every component has its own folder named like the component; the file name
  matches the default-exported component name.
- One component per file, default export, function component
  (`const Name = (props) => ...`). The only class component is `ErrorBoundary`.
- If a component's styled-components code grows past ~30 lines, move it to
  `Name.styles.js` in the same folder.
- Tests sit next to the file: `name.test.js` / `Name.test.jsx`.
- Import across folders through aliases (`~shared-components/EmptyState/EmptyState`);
  relative imports only inside the same folder (`./consts`) and for
  `src/theme/` and `src/GlobalStyle/`, which have no alias.

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

- One file per endpoint in `src/api/` (`getDocuments.js`, `read.js`...), one
  default-exported async function that uses the instance from `axios.js`
  (backend) or `readerAxios.js` (card reader) and returns `response.data`.
- Load on mount with `useFetch(fn)`; wrap `fn` in `useCallback` if it depends on
  props/params. Use the returned `refetch` for "Pokušaj ponovo".
- For user-triggered actions, write a plain `async` handler or a feature hook
  (`useCardSlots`, `useDocumentGeneration`) that holds its own state.
- Report errors with `useNotification()` → `notify(message, 'error')`. Error
  messages already come in Serbian from the API clients. Shared copy lives in
  `src/utils/messages.js`.

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
- Pure logic (`src/utils`, hooks): unit tests. Pages/components: React Testing
  Library via `test/renderWithProviders.jsx`, with the API module mocked
  (`jest.mock('~api/getDocuments')`).
- Query by role and accessible name, not by class names.
