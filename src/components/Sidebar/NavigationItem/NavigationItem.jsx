import { alpha } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '~shared-components/Icon/Icon';

const Item = styled(NavLink)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px 6px;
  border-radius: 12px;
  text-decoration: none;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.palette.action.hover};
    color: ${({ theme }) => theme.palette.text.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.primary.main};
    outline-offset: 2px;
  }

  &.active {
    color: ${({ theme }) => theme.palette.primary.main};
    background-color: ${({ theme }) => alpha(theme.palette.primary.main, 0.12)};
  }

  &.active::before {
    content: '';
    position: absolute;
    left: -12px;
    top: 12px;
    bottom: 12px;
    width: 3px;
    border-radius: 0 3px 3px 0;
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const NavigationItem = ({ label, icon, route, end }) => (
  <Item to={route} end={end}>
    <Icon as={icon} size={24} />
    {label}
  </Item>
);

export default NavigationItem;
