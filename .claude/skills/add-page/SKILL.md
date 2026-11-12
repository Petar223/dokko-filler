---
name: add-page
description: Add a new page/route to Dokko Filler (page folder in src/pages, lazy route in Root, optional PrivateRoute and sidebar entry, PageHeader, loading/empty/error/success states). Use when the user asks for a new screen, page, route or sidebar item.
---

# Add a page

Read `docs/CONVENTIONS.md` first.

1. **Route constant**: add the path to `ROUTES` in `src/utils/routes.js`. If it
   has params, add a builder next to it (like `createDocumentPath`) that
   `encodeURIComponent`s every param.
2. **Page folder**: `src/pages/<Name>/<Name>.jsx`, default export named
   `<Name>`. Page-only constants or mock data go in the same folder
   (`consts.js`, `<name>Data.js`).
3. **Register** in `src/components/Root/Root.jsx`:
   - `const Name = lazy(() => import('~pages/<Name>/<Name>'));`
   - Public: next to the other public routes.
   - Needs login: inside the `<Route element={<PrivateRoute />}>` group.
4. **Sidebar** (only if it is a top-level destination): add
   `{ label, icon, route }` to `NAV_ITEMS` in `src/components/Sidebar/Sidebar.jsx`.
   Pick an icon from `~components/Icons` that no other item uses. Label is Serbian.
5. **Layout of the page**:
   ```jsx
   <>
     <PageHeader title="…" subtitle="…" onBack={…} actions={…} />
     {content}
   </>
   ```
   Layout already adds max width, padding and the page ErrorBoundary. Don't
   add your own outer container.
6. **Bigger pieces of UI** with their own state go to
   `src/components/<Name>/` (see `add-component`), not into the page file.
7. **Data**: an API function in `src/api/` (see `add-api-call`), loaded with
   `useFetch(useCallback(() => apiFn(param), [param]))`. Cover all four states:
   - `loading` → `<LoadingState />` or `<LoadingState cards={6} />`
   - `error` → `<EmptyState color="error" title=… action={<Button onClick={refetch}>Pokušaj ponovo</Button>} />`
   - empty → `<EmptyState title=… />`
   - success → content (`CardGrid` for card lists)
8. **Copy**: Serbian (Latin). Messages reused elsewhere go in `src/utils/messages.js`.
9. **Test**: `src/pages/<Name>/<Name>.test.jsx` with `renderWithProviders`
   (from `test/renderWithProviders.jsx`). Mock the API module and assert
   loading, empty, error and success (see `pages/DocumentsList/DocumetsList.test.jsx`).
10. Run the `verify-change` skill. Check the page in light and dark mode.
