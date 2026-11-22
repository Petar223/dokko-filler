import { CENTER, tourTarget } from '~utils/tour';

// Copy: `tour.welcome.<id>.title|content` in src/locales.
export const WELCOME_TOUR_STEPS = [
  { id: 'intro', ...CENTER },
  { id: 'contracts', target: tourTarget('nav-contracts'), placement: 'right' },
  { id: 'demo', target: tourTarget('nav-demo'), placement: 'right' },
  { id: 'language', target: tourTarget('language-switch') },
  { id: 'theme', target: tourTarget('theme-switch') },
  { id: 'userMenu', target: tourTarget('user-menu'), placement: 'bottom-end' },
  { id: 'done', ...CENTER },
];
