// Tour steps point at elements marked with `data-tour="<id>"` (kebab-case),
// never at CSS classes or MUI internals, so restyling cannot break a tour.
export const tourTarget = (id) => `[data-tour="${id}"]`;

// Centered step without a target (intro / outro).
export const CENTER = { target: 'body', placement: 'center' };
