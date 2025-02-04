import React from "react";
import styled from "styled-components";
import NavigationItem from "./NavigationItem/NavigationItem";

const SidebarContainer = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.palette.lightGrey[700]};
  box-sizing: border-box;
  padding-top: 16px;
  padding-bottom: 16px;
`;

const StyledList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function Sidebar() {
  const navigationItems = [
    {
      label: "Početna",
      icon: "HouseIcon",
      route: "/",
    },
    {
      label: "Ugovori",
      icon: "DescriptionIcon",
      route: "/documents",
    },
    {
      label: "O platformi",
      icon: "BuildingIcon",
      route: "/about",
    },
  ];

  return (
    <SidebarContainer>
      <StyledList>
        {navigationItems.map((item, index) => (
          <NavigationItem
            key={index}
            label={item.label}
            icon={item.icon}
            route={item.route}
          />
        ))}
      </StyledList>
    </SidebarContainer>
  );
}

export default Sidebar;
