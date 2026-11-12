import { alpha } from '@mui/material/styles';

export const getComponents = (palette) => ({
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: { borderRadius: 10, paddingInline: 16 },
      sizeLarge: { paddingBlock: 10, paddingInline: 22 },
    },
  },
  MuiIconButton: {
    styleOverrides: { root: { borderRadius: 10 } },
  },
  MuiCard: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: {
        borderRadius: 14,
        border: `1px solid ${palette.divider}`,
        backgroundImage: 'none',
      },
    },
  },
  MuiPaper: {
    styleOverrides: { root: { backgroundImage: 'none' } },
  },
  MuiTextField: {
    defaultProps: { fullWidth: true },
  },
  MuiOutlinedInput: {
    styleOverrides: { root: { borderRadius: 10 } },
  },
  MuiDialog: {
    styleOverrides: { paper: { borderRadius: 16 } },
  },
  MuiMenu: {
    styleOverrides: {
      paper: {
        borderRadius: 12,
        border: `1px solid ${palette.divider}`,
        boxShadow: '0 12px 32px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  MuiAlert: {
    styleOverrides: { root: { borderRadius: 10 } },
  },
  MuiTooltip: {
    defaultProps: { arrow: true },
  },
  MuiChip: {
    styleOverrides: { root: { fontWeight: 600 } },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        height: 6,
        borderRadius: 3,
        backgroundColor: alpha(palette.primary.main, 0.15),
      },
      bar: { borderRadius: 3 },
    },
  },
});
