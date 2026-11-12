---
name: add-component
description: Create a new React component in Dokko Filler following the design system (placement in ui/ vs feature folder, theme tokens only, MUI primitives, a11y, light/dark check, test). Use when adding or extracting any UI component.
---

# Add a component

1. **Where**:
   - Used by one feature → `src/features/<feature>/Name.jsx`.
   - Generic and presentational (no API calls, no feature knowledge) →
     `src/ui/Name.jsx`, and add it to the catalog in `docs/DESIGN_SYSTEM.md`.
   - Check `src/ui/` first: `PageHeader`, `EmptyState`, `LoadingState`,
     `FieldList`, `CardGrid`, `Icon`, `PasswordField` may already cover it.
2. **Shape**: function component, default export, props destructured in the
   signature. Styled code over ~30 lines goes to `Name.styles.js`.
3. **Styling**:
   - Interactive elements are MUI (`Button`, `IconButton`, `ButtonBase`,
     `CardActionArea`, `Switch`, `TextField`...). Never a raw styled `<button>`.
   - Colors only from tokens (`text.secondary`, `divider`, `action.hover`,
     `primary.main`, `alpha(theme.palette.primary.main, 0.1)`). No hex.
   - Spacing from the 8px grid. Radius from the theme (cards 14, controls 10).
   - Icons: `<Icon as={SomeIcon} size={20} />` so they inherit `currentColor`.
   - styled-components props that must not reach the DOM use `$` (`$size`).
4. **Accessibility**:
   - Icon-only buttons get a Serbian `aria-label`.
   - No interactive element inside another (e.g. a button in a clickable card).
   - Loading buttons/cards are `disabled` and use `aria-busy`.
   - Overlays use MUI `Dialog`/`Menu`/`Popover`, not hand-made ones.
5. **Test** `Name.test.jsx`: render with `renderWithProviders` and query by
   role and name. Cover the states the component has (e.g. loading, disabled,
   empty value).
6. Toggle dark mode (header button) and look at it. Then run `verify-change`.
