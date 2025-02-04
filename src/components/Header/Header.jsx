import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.businessBlue.light};
  padding: 0 20px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.primary.light};
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: pulse 2s ease-in-out 3 forwards;

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      color: ${({ theme }) => theme.palette.primary.contrastText};
    }
    50% {
      transform: scale(1.1);
      color: ${({ theme }) => theme.palette.primary.light};
    }
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo>dokko filler</Logo>
    </HeaderContainer>
  );
}

export default Header;
