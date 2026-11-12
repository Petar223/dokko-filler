---
name: ui-design-system
description: Rules for any visual/styling work in Dokko Filler - theme tokens, typography, spacing, shared-components catalog, do/don't list and the light/dark contrast checklist. Use whenever changing colors, layout, spacing, typography or the look of any component or page.
---

# UI design system

Reference: `docs/DESIGN_SYSTEM.md` (tokens and catalog). Theme source: `src/theme/`.

## Do

- Use tokens: `primary.main`, `text.primary`, `text.secondary`, `divider`,
  `background.paper`, `background.default`, `action.hover`, status colors.
- Tint with `alpha(theme.palette.X.main, 0.1)` for icon tiles / soft surfaces.
- Reuse `PageHeader`, `EmptyState`, `LoadingState`, `FieldList`, `CardGrid`,
  `Icon` before building something new.
- Typography variants (`h2` page title, `h6` card title, `body2` dense text,
  `caption` meta). No custom font sizes.
- 8px spacing grid. Radius: controls 10, cards 14, dialogs 16.
- Cards are flat with a `divider` border. Shadows only for floating elements.
- Icons through `<Icon as={X} />` (they inherit `currentColor`).
- Keep the layout: header 64px, sidebar rail 88px, content max 1200px, footer 40px.

## Don't

- Hex colors or `grey[n]` in components (the only exception is the white
  document paper in the preview).
- Raw `<button>`/`<div onClick>` with hand-made styles.
- Fixed widths for cards (`width: 400px`). Use `CardGrid`.
- Uppercase buttons, scale-on-hover, long animations.
- New global styles. Add theme overrides in `src/theme/components.js` instead.

## Changing a token

Edit `src/theme/palette.js` (both modes), then update the table in
`docs/DESIGN_SYSTEM.md`. Check contrast of the text on that color in both modes
(AA: 4.5:1 for body text, 3:1 for large text and icons).

## Dark mode checklist (every visual change)

- [ ] Toggle the theme in the header; reload; the mode persists.
- [ ] Every touched page: text readable, borders visible, no white boxes.
- [ ] Focus rings visible (Tab through the page).
- [ ] Preview dialog: canvas follows the theme, pages stay white.
