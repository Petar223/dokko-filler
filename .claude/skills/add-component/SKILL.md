---
name: add-component
description: Create a new React component in Dokko Filler following the folder structure and design system (components/ vs shared-components/, own folder per component, theme tokens only, MUI primitives, a11y, light/dark check, test). Use when adding or extracting any UI component.
---

# Add a component

1. **Where** (each component gets its own folder, file named like the component):
   - Reusable and presentational (props in, JSX out; no API calls, no
     context except theme) → `src/shared-components/<Name>/<Name>.jsx`, and add
     it to the catalog in `docs/DESIGN_SYSTEM.md`.
   - Plain styled wrapper without logic →
     `src/shared-components/shared-styled-components/<Name>/<Name>.jsx`.
   - App-level, stateful or flow-specific (uses hooks/context/API, composes
     other components) → `src/components/<Name>/<Name>.jsx`.
   - Check `src/shared-components/` first: `PageHeader`, `EmptyState`,
     `LoadingState`, `FieldList`, `CardGrid`, `Icon`, `PasswordField`,
     `DocumentItem`, `LoadedCard` may already cover it.
2. **Shape**: function component, default export, props destructured in the
   signature. Styled code over ~30 lines goes to `<Name>.styles.js` in the
   same folder.
3. **Styling**:
   - Interactive elements are MUI (`Button`, `IconButton`, `ButtonBase`,
     `CardActionArea`, `Switch`, `TextField`...). Never a raw styled `<button>`.
   - Colors only from tokens (`text.secondary`, `divider`, `action.hover`,
     `primary.main`, `alpha(theme.palette.primary.main, 0.1)`). No hex.
   - Spacing from the 8px grid. Radius from the theme (cards 14, controls 10).
   - Icons: `<Icon as={SomeIcon} size={20} />` (`~shared-components/Icon/Icon`,
     icons from `~components/Icons`) so they inherit `currentColor`.
   - styled-components props that must not reach the DOM use `$` (`$size`).
4. **Accessibility**:
   - Icon-only buttons get a Serbian `aria-label`.
   - No interactive element inside another (e.g. a button in a clickable card).
   - Loading buttons/cards are `disabled` and use `aria-busy`.
   - Overlays use MUI `Dialog`/`Menu`/`Popover`, not hand-made ones.
5. **Test** `<Name>.test.jsx` in the same folder: render with
   `renderWithProviders` and query by role and name. Cover the states the
   component has (e.g. loading, disabled, empty value).
6. Toggle dark mode (header button) and look at it. Then run `verify-change`.
