import styled from 'styled-components';

// Sizes and colors the svgr icons from ~ui/Icons. Color defaults to the
// surrounding text color, so icons follow the theme automatically.
const Svg = styled.svg`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  flex-shrink: 0;
  fill: currentColor;
  color: ${({ $color, theme }) =>
    $color
      ? (theme.palette[$color]?.main ?? theme.palette.text[$color])
      : 'inherit'};
`;

/** <Icon as={HouseIcon} size={24} color="primary" /> */
const Icon = ({ as, size = 24, color, ...rest }) => (
  <Svg as={as} $size={size} $color={color} aria-hidden="true" {...rest} />
);

export default Icon;
