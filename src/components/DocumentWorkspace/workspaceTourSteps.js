import { CENTER, tourTarget } from '~utils/tour';

// Shared by the real flow (`tour.workspace.*`) and the demo
// (`tour.demoWorkspace.*`): same screen, different copy.
export const WORKSPACE_TOUR_STEPS = [
  {
    id: 'cards',
    target: `${tourTarget('workspace-cards')} > :first-child`,
    placement: 'right',
  },
  { id: 'progress', target: tourTarget('workspace-progress') },
  {
    id: 'preview',
    target: tourTarget('workspace-preview'),
    placement: 'bottom-end',
  },
  { id: 'done', ...CENTER },
];
