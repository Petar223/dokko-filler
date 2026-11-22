import { CENTER, tourTarget } from '~utils/tour';

// Copy: `tour.demoList.<id>.*` in src/locales. The workspace tour of the demo
// is DocumentWorkspace's own (`tourName="demoWorkspace"`).
export const DEMO_LIST_STEPS = [
  { id: 'intro', ...CENTER },
  {
    id: 'contract',
    target: `${tourTarget('demo-contracts')} > :first-child`,
    placement: 'right',
  },
];
