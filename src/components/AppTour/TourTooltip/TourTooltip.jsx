import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { CloseLineIcon } from '~components/Icons';
import Icon from '~shared-components/Icon/Icon';

// Joyride focuses the primary button on every step (focus trap). MUI's
// pulsing focus ripple looks like a glitch there, so show a plain ring.
const FOCUS = {
  disableFocusRipple: true,
  sx: {
    '&.Mui-focusVisible': {
      outline: 2,
      outlineColor: 'primary.main',
      outlineOffset: 2,
    },
  },
};

/**
 * Joyride `tooltipComponent` in our design system. Joyride passes the button
 * props (label as `children`, `aria-label`, `onClick`); we only spread them
 * onto MUI buttons, and show only the buttons listed in `step.buttons`.
 */
const TourTooltip = ({
  step,
  index,
  size,
  backProps,
  closeProps,
  primaryProps,
  skipProps,
  tooltipProps,
}) => {
  const { t } = useTranslation();
  const titleId = useId();
  const show = (button) => step.buttons.includes(button);
  // The close button is an icon; its text label would render inside it.
  const { children, ...closeButtonProps } = closeProps;

  return (
    <Paper
      {...tooltipProps}
      aria-labelledby={step.title ? titleId : undefined}
      elevation={8}
      sx={{
        width: 380,
        maxWidth: 'calc(100vw - 32px)',
        p: 2.5,
        borderRadius: '14px',
        // Flat color so the Joyride arrow (same color) matches in dark mode.
        backgroundImage: 'none',
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: 'flex-start', mb: 1 }}
      >
        <Typography
          id={titleId}
          variant="h6"
          component="h2"
          sx={{ flex: 1, minWidth: 0 }}
        >
          {step.title}
        </Typography>
        {show('close') && (
          <IconButton
            {...closeButtonProps}
            size="small"
            sx={{ mt: -0.5, mr: -1, color: 'text.secondary' }}
          >
            <Icon as={CloseLineIcon} size={16} />
          </IconButton>
        )}
      </Stack>

      <Typography variant="body2" color="text.secondary" component="div">
        {step.content}
      </Typography>

      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mt: 2.5 }}>
        <Typography variant="caption" color="text.secondary">
          {t('tour.progress', { current: index + 1, total: size })}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ ml: 'auto' }}>
          {show('skip') && (
            <Button {...skipProps} {...FOCUS} color="inherit" size="small" />
          )}
          {show('back') && index > 0 && (
            <Button {...backProps} {...FOCUS} size="small" />
          )}
          {show('primary') && (
            <Button
              {...primaryProps}
              {...FOCUS}
              variant="contained"
              size="small"
            />
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default TourTooltip;
