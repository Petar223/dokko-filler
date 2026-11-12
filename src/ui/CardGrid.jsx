import styled from 'styled-components';

// Fluid grid: fixed-width cards on desktop, wraps cleanly on narrow screens.
export const CardGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
  grid-template-columns: repeat(
    auto-fill,
    minmax(min(100%, ${({ $min = 260 }) => $min}px), 1fr)
  );
`;
