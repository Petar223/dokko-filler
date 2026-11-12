# Design system

One theme object (`src/theme/`) feeds both MUI and styled-components, so
`theme.palette.*` works the same in `sx`, MUI props and styled templates.

## Color tokens

| Token | Light | Dark | Use |
|---|---|---|---|
| `primary.main` | `#336699` | `#7FA8D4` | Brand, primary buttons, active nav, links |
| `primary.light` / `dark` | `#5C8AB8` / `#244B73` | | Hover, accents |
| `secondary.main` | `#4CCEAC` | `#4CCEAC` | Sparse accent |
| `background.default` | `#F5F7FA` | `#0F172A` | Page canvas |
| `background.paper` | `#FFFFFF` | `#1E293B` | Cards, header, sidebar, dialogs |
| `text.primary` | `#0F172A` | `#E2E8F0` | Body text, headings |
| `text.secondary` | `#475569` | `#94A3B8` | Captions, labels, hints |
| `divider` | `#E2E8F0` | slate 18% | Borders, separators |
| `error` / `warning` / `success` / `info` | MUI defaults | | Status |

Tinted surfaces: `alpha(theme.palette.<color>.main, 0.1)` (icon tiles),
`0.12` (active nav pill), `0.04` (hover wash).

The dark-mode brand color is lighter on purpose: `#336699` on `#0F172A` fails
contrast.

## Typography

Inter Variable (self-hosted via `@fontsource-variable/inter`).

| Variant | Size / weight | Use |
|---|---|---|
| `h1` | 40 / 700 | Home hero only |
| `h2` | 32 / 700 | Page title (`PageHeader`, rendered as `<h1>`) |
| `h3` | 24 / 650 | Auth card title |
| `h4` | 20 / 650 | Section title, `EmptyState` title |
| `h5` | 18 / 600 | Sub-section title |
| `h6` | 16 / 600 | Card title |
| `body1` / `body2` | 16 / 14 | Text / dense text |
| `caption` | 12 | Footer, meta |

Buttons are sentence case (no uppercase), weight 600.

## Shape, spacing, elevation

- Spacing: 8px grid (`theme.spacing(1) = 8px`). Page padding 32px (24px on xs).
- Radius: 10px base (buttons, inputs, alerts), 14px cards, 16px dialogs,
  12px nav items and menus.
- Elevation: cards are flat with a `divider` border. Shadows only for floating
  things (menus, hover lift on clickable cards, preview pages).

## Layout

- Header 64px, `background.paper`, bottom `divider`.
- Sidebar rail 88px, icon + label. Active item: primary text, 12% primary pill,
  3px indicator on the left.
- Content max width 1200px, centered.
- Footer 40px, top `divider`, caption text and app version.
- Card lists use `CardGrid` (`repeat(auto-fill, minmax(min(100%, $min), 1fr))`).

## `ui/` catalog

| Component | Props | Notes |
|---|---|---|
| `PageHeader` | `title, subtitle?, onBack?, actions?` | Top of every page |
| `EmptyState` | `icon?, title, description?, action?, color?` | Empty, error, 404 |
| `LoadingState` | `cards?, cardHeight?, minWidth?` | Spinner, or skeleton grid with `cards` |
| `FieldList` | `items: [{ label, value }]` | Key-value rows, `—` for empty |
| `CardGrid` | `$min?` (px, default 260) | Fluid grid |
| `Icon` | `as, size?, color?` | Wraps svgr icons, fills with `currentColor` |
| `PasswordField` | TextField props | Show/hide toggle |
| `Icons/*` | | svgr components; regenerate with `npm run svgr` |

## Motion

- `fadeIn` keyframe (global): 0.25–0.4s on page/card entry.
- Hover: color/border transitions of 0.2s. No scale effects.
- `prefers-reduced-motion` disables animations globally.

## Dark mode checklist

- [ ] No hex colors in the component (only tokens).
- [ ] Text on tinted surfaces is still readable (check `text.secondary`).
- [ ] Borders use `divider`, not grey shades.
- [ ] Icons inherit `currentColor` (no fixed `fill`).
- [ ] Document paper in the preview stays white.
- [ ] Checked by toggling the theme in the header on every touched page.
