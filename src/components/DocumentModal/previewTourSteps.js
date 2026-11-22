import { tourTarget } from '~utils/tour';

// Copy: `tour.preview.<id>.*` in src/locales.
export const PREVIEW_TOUR_STEPS = [
  { id: 'zoom', target: tourTarget('preview-zoom') },
  { id: 'highlight', target: tourTarget('preview-highlight') },
  {
    id: 'download',
    target: tourTarget('preview-download'),
    placement: 'bottom-end',
  },
];
