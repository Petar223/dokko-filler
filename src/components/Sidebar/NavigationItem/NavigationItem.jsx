import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  DescriptionIcon,
  BuildingIcon,
  HouseWindowIcon,
} from "~components/Icons";

const StyledListItemLink = styled(NavLink)`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  padding: 8px 16px;
  transition:
    background-color 0.4s ease,
    color 1s ease;

  &.active {
    background-color: ${({ theme }) => theme.palette.grey[900]};
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey[800]};
    cursor: pointer;
  }
`;

const StyledIcon = styled.div`
  width: 32px;
  height: 32px;
  margin-bottom: 8px;

  & > svg {
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => theme.palette.grey[500]};
  }
`;

const StyledText = styled.span`
  white-space: nowrap;
  font-size: 0.875rem;
`;

function NavigationItem({ label, icon, route }) {
  const icons = {
    DescriptionIcon: <DescriptionIcon />,
    BuildingIcon: <BuildingIcon />,
    HouseIcon: <HouseWindowIcon />,
  };

  return (
    <StyledListItemLink to={route}>
      <StyledIcon>{icons[icon]}</StyledIcon>
      <StyledText>{label}</StyledText>
    </StyledListItemLink>
  );
}

export default NavigationItem;
