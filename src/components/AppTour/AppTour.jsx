import { alpha, useTheme } from '@mui/material/styles';
import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ACTIONS, EVENTS, Joyride, ORIGIN, STATUS } from 'react-joyride';
import TourTooltip from './TourTooltip/TourTooltip';

/**
 * The only place that renders react-joyride. Every tour goes through it, so
 * look, buttons, locale and keyboard behavior are the same everywhere.
 *
 * - `name`: copy lives in the locale files under `tour.<name>`; each step's
 *   title/content come from `tour.<name>.<step.id>.title|content`, and the
 *   last button from `lastKey` ?? `tour.<name>.last` ?? `tour.last`.
 * - `steps`: data only ({ id, target, placement, ... }), no text.
 * - `onEnd(status)`: called once with `'finished'` or `'skipped'`
 *   (Esc, the X and "Preskoči" are always `'skipped'`).
 * - `aboveDialogs`: for tours over an open MUI Dialog. Render the AppTour
 *   next to the Dialog (not inside it) and give the Dialog
 *   `disableEnforceFocus` and `disableEscapeKeyDown` while the tour runs.
 */
const AppTour = ({
  name,
  steps,
  run,
  onEnd,
  lastKey,
  aboveDialogs = false,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  // Esc on the last step makes Joyride report "finished"; we know better.
  const dismissed = useRef(false);

  const translatedSteps = useMemo(
    () =>
      steps.map((step) => ({
        ...step,
        title: t(`tour.${name}.${step.id}.title`),
        content: t(`tour.${name}.${step.id}.content`),
      })),
    [steps, name, t]
  );

  const locale = useMemo(
    () => ({
      back: t('tour.back'),
      close: t('tour.close'),
      last: t([lastKey ?? `tour.${name}.last`, 'tour.last']),
      next: t('tour.next'),
      skip: t('tour.skip'),
    }),
    [t, name, lastKey]
  );

  const options = useMemo(
    () => ({
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
    }),
    [theme, aboveDialogs]
  );

  const handleEvent = ({ type, action, origin, status }, controls) => {
    if (type === EVENTS.TOUR_START) dismissed.current = false;
    // Esc would only close the step (and continue); make it end the tour.
    if (action === ACTIONS.CLOSE && origin === ORIGIN.KEYBOARD) {
      dismissed.current = true;
      controls.skip(ORIGIN.BUTTON_CLOSE);
      return;
    }
    if (type === EVENTS.TOUR_END) {
      onEnd?.(dismissed.current ? STATUS.SKIPPED : status);
    }
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
