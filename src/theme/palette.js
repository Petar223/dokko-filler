const brand = {
  main: '#336699',
  light: '#5C8AB8',
  dark: '#244B73',
  contrastText: '#FFFFFF',
};

const secondary = {
  main: '#4CCEAC',
  light: '#94E2CD',
  dark: '#2E9C80',
  contrastText: '#0F172A',
};

export const getPalette = (mode) =>
  mode === 'dark'
    ? {
        mode,
        // Lighter brand tint keeps AA contrast on dark surfaces.
        primary: {
          ...brand,
          main: '#7FA8D4',
          dark: '#5C8AB8',
          contrastText: '#0F172A',
        },
        secondary,
        background: { default: '#0F172A', paper: '#1E293B' },
        text: { primary: '#E2E8F0', secondary: '#94A3B8' },
        divider: 'rgba(148, 163, 184, 0.18)',
      }
    : {
        mode,
        primary: brand,
        secondary,
        background: { default: '#F5F7FA', paper: '#FFFFFF' },
        text: { primary: '#0F172A', secondary: '#475569' },
        divider: '#E2E8F0',
      };
