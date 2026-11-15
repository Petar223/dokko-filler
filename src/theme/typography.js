const balanced = { textWrap: 'balance' };
const pretty = { textWrap: 'pretty' };

export const typography = {
  fontFamily:
    '"Inter Variable", Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    ...balanced,
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 700,
    letterSpacing: '-0.01em',
    lineHeight: 1.25,
    ...balanced,
  },
  h3: { fontSize: '1.5rem', fontWeight: 650, lineHeight: 1.3, ...balanced },
  h4: { fontSize: '1.25rem', fontWeight: 650, lineHeight: 1.35, ...balanced },
  h5: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.4, ...balanced },
  h6: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.4, ...balanced },
  body1: { fontSize: '1rem', lineHeight: 1.6, ...pretty },
  body2: { fontSize: '0.875rem', lineHeight: 1.55, ...pretty },
  caption: { fontSize: '0.75rem', lineHeight: 1.4 },
  button: { textTransform: 'none', fontWeight: 600 },
};
