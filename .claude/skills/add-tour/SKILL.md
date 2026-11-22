---
name: add-tour
description: Add or change a guided product tour (react-joyride v3) in Dokko Filler - step data with data-tour targets, copy in both locale files, the shared AppTour wrapper and TourTooltip, useTour run/seen state, auto-start once vs replay button, tests with real Joyride. Use when the user asks for an onboarding tour, app tour, walkthrough, coach marks, tooltip tutorial, or to change the welcome or demo tour.
---

# Add a product tour

Tours use **react-joyride v3** (`import { Joyride } from 'react-joyride'`).
v3 renamed most of the v2 API, so code or answers written for v2 are wrong here:
`callback` is now `onEvent(data, controls)`, `run` defaults to `false`,
`disableBeacon` is now `skipBeacon`, `showSkipButton` is now `options.buttons`,
`styles.options` is now `options`, and the locale key `nextLabelWithProgress`
is now `nextWithProgress`. When in doubt, read the types in
`node_modules/react-joyride/dist/index.d.mts`, not a blog post.

## What already exists (reuse, never copy)

| Piece | Where | Job |
|---|---|---|
| `AppTour` | `src/components/AppTour/AppTour.jsx` | **The only place that renders `<Joyride>`.** Theme colors, z-index, locale, buttons, Esc ends the tour, translates steps |
| `TourTooltip` | `src/components/AppTour/TourTooltip/` | MUI tooltip (`tooltipComponent`), progress "2 od 5" |
| `useTour(id, { autoStart })` | `src/hooks/useTour.js` | `{ run, start, end }`; "seen" flag in `localStorage` (`dokko-tour:<id>`) |
| `tourTarget(id)`, `CENTER` | `src/utils/tour.js` | Step target selector, centered step |
| Welcome tour | `src/components/WelcomeTour/` | After the first login (owned by `Profile`, replay from the user menu) |
| Contract list | `src/pages/DocumentsList/documentsTour.js` | First contract + "start the reader" |
| Workspace | `src/components/DocumentWorkspace/workspaceTourSteps.js` | Card slots, progress, preview button; `tourName` prop picks the copy (`workspace` real, `demoWorkspace` demo) |
| Preview | `src/components/DocumentModal/previewTourSteps.js` | Zoom, highlight, download (over the dialog) |
| Demo list | `src/pages/DemoPage/demoTours.js` | Demo intro + demo contract |

Never render `<Joyride>` directly, never pass it `styles`/colors, and never
build a tooltip by hand. If every tour needs a change, change `AppTour` or
`TourTooltip` once.

## Steps

1. **Mark the targets** with `data-tour="<kebab-id>"` on the element itself
   (the MUI component passes it to the DOM):
   ```jsx
   <Button data-tour="workspace-preview" ...>
   <CardGrid data-tour="workspace-cards">   // then target `> :first-child`
   ```
   - Never target CSS classes, MUI class names (`.MuiButton-root`) or text.
   - The element must have a box: not `display: contents`, not a fragment.
   - Ids are stable and unique on the screen. A list item gets the id on its
     container plus `> :first-child` in the step.
2. **Step data** next to its owner (page-only → `src/pages/<Page>/<name>Tours.js`,
   component-owned → `<Component>/<name>TourSteps.js`). Data only, no text:
   ```js
   import { CENTER, tourTarget } from '~utils/tour';

   export const BILLING_TOUR_STEPS = [
     { id: 'intro', ...CENTER },
     { id: 'plan', target: tourTarget('billing-plan'), placement: 'right' },
     { id: 'done', ...CENTER },
   ];
   ```
   - `id` is required: it is the locale key. Start with an intro and end with
     a `CENTER` outro that says what to do next.
   - At most ~6 steps per tour. Split longer flows per screen (as the demo does).
   - Per-step options are allowed when needed (`placement`, `spotlightPadding`,
     `blockTargetInteraction`, `buttons: ['primary']`), never colors or text.
3. **Copy** in BOTH `src/locales/sr.json` and `src/locales/en.json` under
   `tour.<tourName>`:
   ```json
   "billing": {
     "last": "Idi na naplatu",
     "intro": { "title": "…", "content": "…" },
     "plan":  { "title": "…", "content": "…" }
   }
   ```
   - `last` is optional (label of the last button, falls back to `tour.last`).
   - Serbian Latin, short: a title of 1-4 words and content of 1-2 sentences
     that tell the user *why*, not what the button is called.
   - The shared button labels are `tour.back|next|skip|close|last`. Do not
     duplicate them.
4. **Run state** with `useTour` in the component that owns the screen:
   ```jsx
   const billingTour = useTour('billing', { autoStart: true });
   …
   <AppTour
     name="billing"
     steps={BILLING_TOUR_STEPS}
     run={billingTour.run}
     onEnd={billingTour.end}
   />
   ```
   - `id` is unique per tour. Add the user when it is user-specific:
     `useTour(user && \`welcome:${user}\`, …)` (`null` = never runs).
   - `autoStart: true` = once per browser until finished or skipped.
     Without it the tour waits for `start()`.
   - **Always offer a replay** (`start()`): a "Pokreni vodič" button
     (`t('tour.replay')`) in the `PageHeader` actions, or a menu item.
   - **One tour at a time:** `useTour` gives a single slot to whichever tour
     asks first; the others wait and start in turn. So pass `null` as the id
     while the tour cannot be shown (`useTour(hasItems ? id : null)`),
     otherwise it holds the slot and blocks every other tour.
   - If a step asks the user to click something that leaves the screen, call
     `if (tour.run) tour.end()` in that click handler (see `DocumentsList`),
     or the tour comes back on every visit.
   - Render `<AppTour>` only while its targets can exist (e.g. inside the
     branch that renders the screen). Joyride waits `targetWaitTimeout`
     (1 s) for a missing target and then skips that step.
   - `onEnd(status)` gets `'finished'` or `'skipped'`. Navigate only on
     `'finished'` (see `WelcomeTour`).
   - **Shared screen, different copy** (real vs demo): keep one step list next
     to the shared component and let the caller pick the copy with a
     `tourName` prop (see `DocumentWorkspace`). Never copy the step list.
   - **Tour over an MUI Dialog** (see `DocumentModal`): pass `aboveDialogs`,
     render `<AppTour>` *next to* the `<Dialog>` in a fragment (inside it,
     Esc would also close the dialog through React event bubbling), give the
     Dialog `disableEnforceFocus` and `disableEscapeKeyDown` while the tour
     runs (the tooltip needs the focus, Esc belongs to the tour), and pass
     `useTour(open ? id : null)` so a closed dialog does not hold the tour slot.
5. **Do not** drive `stepIndex` from app state (controlled mode). Joyride's
   docs advise against it: it breaks its lifecycle. If a step needs UI that is
   not there yet (a menu, a dialog), split the tour per screen or use the
   step's `before` hook.
6. **Tests** next to the owner (`<Name>.test.jsx`). Joyride works in jsdom:
   render the target elements and `<AppTour>`/your tour with `run`, click
   through by role/name (`Dalje`, `Preskoči`, your `last` label), and assert
   `onEnd`/navigation. See `WelcomeTour.test.jsx` and `AppTour.test.jsx`.
   `LanguageSwitch.test.jsx` fails if a key exists in only one locale.
7. **Verify** with the `verify-change` skill, plus in the browser:
   - [ ] Clear `localStorage`, open the screen: the tour starts once, each
         spotlight sits on the right element, nothing is cut off at 390px.
   - [ ] Reload: it does not start again. The replay button starts it.
   - [ ] Esc and the X end the tour; Tab stays inside the tooltip.
   - [ ] Dark mode: tooltip, arrow and spotlight readable. English copy fits.

## Behavior that is fixed in AppTour (do not override per tour)

- Continuous tour, no beacons, progress "N od M", buttons Skip / Back / Next.
- X and Esc end the whole tour (Joyride's default only closes the step).
- Clicking the dark overlay does nothing (no accidental skip).
- z-index above the sidebar and header, below MUI dialogs and snackbars
  (`aboveDialogs` puts it just above dialogs, still below snackbars).
