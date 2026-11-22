# Code patterns

How code looks in Dokko Filler. [CONVENTIONS.md](CONVENTIONS.md) says *where* a
file goes and which rules apply; this file shows *how to write it*, with the
real code it comes from. When you add something, find the closest pattern here
and copy its shape. If none fits, see "When nothing fits" at the end.

## 0. Before writing code (the ladder)

Stop at the first rung that holds:

1. Does it need to exist at all? A speculative need gets one line in the
   report, not code.
2. Is it already in the codebase? Check `shared-components/`, `hooks/`, `utils/`
   and the skills. Reuse it, or extend it with one prop.
3. Does the platform or an installed dependency do it? (MUI, i18next,
   react-joyride, `Intl`, CSS.) Use it.
4. Only then write the minimum code, in one of the shapes below.

A deliberate shortcut gets a `// ponytail:` comment that names its limit and
the upgrade path:

```js
// ponytail: "seen" lives in localStorage (per browser). Move it to a Cognito
// user attribute if tours must not repeat on another device.
```

## 1. Component

```jsx
// src/shared-components/LanguageSwitch/LanguageSwitch.jsx
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

/** Toggles between Serbian and English; shows the language it switches to. */
const LanguageSwitch = () => {
  const { t, i18n } = useTranslation();
  const next = i18n.language === 'sr' ? 'en' : 'sr';
  return (
    <Button onClick={() => i18n.changeLanguage(next)} aria-label={t('language.switchTo')}>
      {next.toUpperCase()}
    </Button>
  );
};

export default LanguageSwitch;
```

- Arrow function component, props destructured in the signature, default export.
- A one-line JSDoc that says *why it exists*, not what JSX it renders.
- MUI primitives, `sx` with theme tokens, every string through `t()`.
- Derived values are plain `const`s computed during render (`next`, `allLoaded`,
  `hasDocuments`), not state plus an effect.
- An expression-bodied component (`=> (...)`) becomes a block body only when it
  needs a hook.

## 2. Page with data

```jsx
// src/pages/DocumentsList/DocumetsList.jsx (shape)
const DocumentsList = () => {
  const { t } = useTranslation();
  const { data, loading, error, refetch } = useFetch(getDocuments);
  const documents = Array.isArray(data?.body) ? data.body : null;

  const content = () => {
    if (loading) return <LoadingState cards={6} cardHeight={180} />;
    if (error || !documents) return <EmptyState color="error" … action={retry} />;
    if (!documents.length) return <EmptyState icon={…} title={t('documents.listEmpty')} />;
    return <CardGrid>{documents.map(…)}</CardGrid>;
  };

  return (
    <>
      <PageHeader title={t('documents.title')} actions={…} />
      {content()}
    </>
  );
};
```

- `PageHeader` first, then `content()` with early returns in the order
  loading → error → empty → success.
- Validate the API shape once at the top (`Array.isArray(...) ? ... : null`).
  A wrong shape is shown as the error state, never as a crash.

## 3. API call

```js
// src/api/getDocuments.js
import axiosInstance from './axios';

const getDocuments = async () => {
  const response = await axiosInstance.get('GetListOfDocs');
  return response.data;
};

export default getDocuments;
```

- One function per file. It returns `response.data`. No try/catch: the axios
  instance already turns failures into an `Error` with a translated `message`.
- The backend goes through `./axios`, the card reader through `./readerAxios`.

## 4. Feature hook (state + actions)

```js
// src/hooks/useCardSlots.js (shape)
const useCardSlots = (readFn) => {
  const notify = useNotification();
  const [snapshots, setSnapshots] = useState({});
  const busy = useRef(false);

  const loadCard = useCallback(async (card) => {
    if (busy.current) return;               // guard first
    busy.current = true;
    try {
      const snapshot = await readFn(card.order);
      setSnapshots((prev) => ({ ...prev, [card.order]: snapshot }));
      notify(i18n.t('reader.loaded', { name: card.name }), 'success', 3000);
    } catch (error) {
      notify(error.message || i18n.t('reader.readFailed'), 'error');
    } finally {
      busy.current = false;
    }
  }, [readFn, notify]);

  const fields = useMemo(() => …, [snapshots]);   // derived, not stored
  return { snapshots, fields, loadingOrder, loadCard, removeCard };
};
```

- The hook owns the state and the side effects; components only call it.
- Actions are `useCallback`s and use functional `setState(prev => …)`.
- Derived data is `useMemo`, never a second `useState`.
- It returns an object of names (`{ run, start, end }`), never an array.
- Errors go to `notify()`. The hook reports, it does not throw at the UI.
- Async results that can arrive out of order keep only the latest one
  (`useFetch`: `latestRequest` ref + `isLatest()`).

## 5. Configuration is data, the component is generic

```js
// src/components/Sidebar/Sidebar.jsx
const NAV_ITEMS = [
  { label: 'nav.home', tourId: 'nav-home', icon: HouseWindowIcon, route: ROUTES.HOME, end: true },
  …
];

// src/components/DocumentWorkspace/workspaceTourSteps.js
export const WORKSPACE_TOUR_STEPS = [
  { id: 'cards', target: `${tourTarget('workspace-cards')} > :first-child`, placement: 'right' },
  { id: 'done', ...CENTER },
];
```

- Lists of things (menu items, tour steps, demo contracts, card types) are
  plain arrays and objects in `UPPER_SNAKE_CASE`, next to the code that owns
  them (`demoData.js`, `consts.js`, `*TourSteps.js`).
- **No text in data.** Store the translation key (`'nav.home'`) or an `id` the
  key is built from (`tour.<name>.<id>.title`).
- One generic component renders the data (`AppTour`, `NavigationItem`). A new
  item is a new array entry, not new JSX.
- When two screens differ only in copy, pass a name (`tourName="demoWorkspace"`),
  never copy the data.

## 6. One wrapper per third-party library

| Library | Only touched in |
|---|---|
| react-joyride | `components/AppTour/` |
| aws-amplify | `utils/cognitoAuth.js` |
| axios | `api/axios.js`, `api/readerAxios.js` |
| docx-preview / mammoth | `components/DocxViewer/` (+ `utils/placeholders.js` for text) |
| docx (patchDocument) | `utils/documentUtils.js` |
| i18next setup | `utils/i18n.js` |

- The wrapper sets the project defaults once (theme, locale, error messages).
  Callers pass only what differs.
- Changing library behavior for everyone means editing the wrapper, never
  patching one caller.

## 7. Text (i18n)

```jsx
t('documents.count', { count: documents.length })    // plural: _one/_few/_other
t([`tour.${name}.last`, 'tour.last'])                 // fallback key
i18n.t('reader.offline')                              // outside React, at call time
```

- Every key goes into **both** `sr.json` and `en.json`. A test fails when they
  differ.
- Keys are grouped by area (`auth.*`, `preview.*`, `tour.<name>.*`). Shared
  labels live in `common.*` and `tour.*`; never duplicate them.
- Outside components, call `i18n.t` when the message is needed, never at
  module load (the language can change).

## 8. Browser storage

```js
const isSeen = (id) => {
  try {
    return localStorage.getItem(storageKey(id)) !== null;
  } catch {
    return true; // storage blocked: fail quietly, never nag
  }
};
```

- Keys start with `dokko-` (`dokko-color-mode`, `dokko-language`,
  `dokko-tour:<id>`).
- Every read and write sits in try/catch, and the app works without storage.
- Only per-browser conveniences go in storage. Anything that must follow the
  user belongs on the backend or in Cognito (leave a `ponytail:` comment).

## 9. Hooks for elements

- Tour targets: `data-tour="<kebab-id>"` on the element (`tourTarget(id)`).
- Tests: role and accessible name. Never add a `data-testid` or a class name
  just for a test.

## 10. Tests

```jsx
it('auto-starts once, and not again after it ended', () => {
  const first = renderHook(() => useTour('demo', { autoStart: true }));
  expect(first.result.current.run).toBe(true);
  act(() => first.result.current.end());
  …
});
```

- The test name is a sentence about behavior, written from the user's view.
- One behavior per test; arrange → act → assert, no shared mutable setup
  except `beforeEach(() => localStorage.clear())`.
- Mock only the boundary: the API module (`jest.mock('~api/getDocuments')`),
  never your own hooks or components. Libraries run for real (Joyride,
  i18next, MUI).
- A bug fix starts with a test that fails without the fix.

## 11. Comments

- English, and only for *why*: a constraint, a browser quirk, a business
  rule. Never for *what* (`// set loading to true`).
- `// ponytail:` = a deliberate shortcut with its limit and upgrade path.
- No commented-out code, no TODOs without an owner.

## What we don't do

- Hard-coded UI text, hex colors, `grey[n]`, fixed card widths.
- `useEffect` that copies props into state, or that drives one state from another.
- A second library for something an installed one already does.
- Helpers or abstractions "for later": one implementation means no interface,
  and a value that never changes means no config.
- Patching one caller when the shared function is wrong (fix the root cause).
- `git commit` / `git push` (the user commits).

## When nothing fits

Write the minimum code, then decide whether it is a new pattern. It is one if
a second feature would copy it. In that case add a section here (with the
real file as the example) or a skill in `.claude/skills/`, in the same change.
