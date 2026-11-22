import { alpha, useTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ACTIONS, EVENTS, Joyride, ORIGIN } from 'react-joyride';
import TourTooltip from './TourTooltip/TourTooltip';

/**
 * The only place that renders react-joyride. Every tour goes through it, so
 * look, buttons, locale and keyboard behavior are the same everywhere.
 *
 * - `name`: copy lives in the locale files under `tour.<name>`; each step's
 *   title/content come from `tour.<name>.<step.id>.title|content`, and the
 *   last button from `tour.<name>.last` (falls back to `tour.last`).
 * - `steps`: data only ({ id, target, placement, ... }), no text.
 * - `onEnd(status)`: called once with `'finished'` or `'skipped'`.
 * - `aboveDialogs`: for tours over an open MUI Dialog. Render the AppTour
 *   next to the Dialog (not inside it, or Esc also closes the dialog) and
 *   pass `disableEnforceFocus` to the Dialog while the tour runs.
 */
const AppTour = ({ name, steps, run, onEnd, aboveDialogs = false }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const translatedSteps = useMemo(
    () =>
      steps.map((step) => ({
        ...step,
        title: t(`tour.${name}.${step.id}.title`),
        content: t(`tour.${name}.${step.id}.content`),
      })),
    [steps, name, t]
  );

  const locale = {
    back: t('tour.back'),
    close: t('tour.close'),
    last: t([`tour.${name}.last`, 'tour.last']),
    next: t('tour.next'),
    open: t('tour.open'),
    skip: t('tour.skip'),
  };

  const options = {
    buttons: ['back', 'close', 'primary', 'skip'],
    // The X ends the tour; by default it only closes the current step.
    closeButtonAction: 'skip',
    // A stray click next to the tooltip must not end or advance the tour.
    overlayClickAction: false,
    skipBeacon: true,
    primaryColor: theme.palette.primary.main,
    backgroundColor: theme.palette.background.paper,
    arrowColor: theme.palette.background.paper,
    textColor: theme.palette.text.primary,
    overlayColor: alpha(theme.palette.common.black, 0.55),
    // Above the header and sidebar; below MUI dialogs unless asked.
    zIndex: (aboveDialogs ? theme.zIndex.modal : theme.zIndex.drawer) + 1,
    spotlightRadius: 12,
    spotlightPadding: 6,
    scrollOffset: 96,
  };

  const handleEvent = ({ type, action, origin, status }, controls) => {
    // Esc would only close the step (and continue); make it end the tour.
    if (action === ACTIONS.CLOSE && origin === ORIGIN.KEYBOARD) {
      controls.skip(ORIGIN.BUTTON_CLOSE);
      return;
    }
    if (type === EVENTS.TOUR_END) onEnd?.(status);
  };

  return (
    <Joyride
      steps={translatedSteps}
      run={run}
      continuous
      scrollToFirstStep
      options={options}
      locale={locale}
      tooltipComponent={TourTooltip}
      onEvent={handleEvent}
    />
  );
};

export default AppTour;
