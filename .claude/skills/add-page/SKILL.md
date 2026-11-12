---
name: add-page
description: Add a new page/route to Dokko Filler (feature folder, lazy route, optional private route and sidebar entry, PageHeader, loading/empty/error/success states). Use when the user asks for a new screen, page, route or sidebar item.
---

# Add a page

Read `docs/CONVENTIONS.md` first.

1. **Route constant**: add the path to `ROUTES` in `src/constants/routes.js`. If it
   has params, add a builder next to it (like `createDocumentPath`) that
   `encodeURIComponent`s every param.
2. **Page file**: `src/features/<feature>/<Name>Page.jsx`, default export.
   Create the feature folder if needed.
3. **Register** in `src/app/Root.jsx`:
   - `const NamePage = lazy(() => import('~features/<feature>/NamePage'));`
   - Public: next to the other public routes.
   - Needs login: inside the `<Route element={<PrivateRoute />}>` group.
4. **Sidebar** (only if it is a top-level destination): add
   `{ label, icon, route }` to `NAV_ITEMS` in `src/app/Sidebar/Sidebar.jsx`.
   Pick an icon from `~ui/Icons` that no other item uses. Label is Serbian.
5. **Layout of the page**:
   ```jsx
   <>
     <PageHeader title="…" subtitle="…" onBack={…} actions={…} />
     {content}
   </>
   ```
   Layout already adds max width, padding and the page ErrorBoundary. Don't
   add your own outer container.
6. **Data**: load with `useFetch(useCallback(() => apiFn(param), [param]))`.
   Cover all four states:
   - `loading` → `<LoadingState />` or `<LoadingState cards={6} />`
   - `error` → `<EmptyState color="error" title=… action={<Button onClick={refetch}>Pokušaj ponovo</Button>} />`
   - empty → `<EmptyState title=… />`
   - success → content (`CardGrid` for card lists)
7. **Copy**: Serbian (Latin). Messages reused elsewhere go in `constants/messages.js`.
8. **Test**: `<Name>Page.test.jsx` with `renderWithProviders` (from
   `test/renderWithProviders.jsx`). Mock the API module and assert loading,
   empty, error and success.
9. Run the `verify-change` skill. Check the page in light and dark mode.
