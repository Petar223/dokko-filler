import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import { CardGrid } from '~shared-components/shared-styled-components/CardGrid/CardGrid';

/** Centered spinner, or a skeleton grid when `cards` is given. */
const LoadingState = ({ cards, cardHeight = 220, minWidth }) =>
  cards ? (
    <CardGrid $min={minWidth} aria-busy="true" aria-label="Učitavanje">
      {Array.from({ length: cards }, (_, i) => (
        <Skeleton key={i} variant="rounded" height={cardHeight} />
      ))}
    </CardGrid>
  ) : (
    <Box
      sx={{ display: 'grid', placeItems: 'center', py: 10, flex: 1 }}
      aria-busy="true"
    >
      <CircularProgress aria-label="Učitavanje" />
    </Box>
  );

export default LoadingState;
