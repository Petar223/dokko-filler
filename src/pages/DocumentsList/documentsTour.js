import { CENTER, tourTarget } from '~utils/tour';

// Copy: `tour.documents.<id>.*` in src/locales.
export const DOCUMENTS_TOUR_STEPS = [
  {
    id: 'contract',
    target: `${tourTarget('documents-list')} > :first-child`,
    placement: 'right',
  },
  { id: 'reader', ...CENTER },
];
