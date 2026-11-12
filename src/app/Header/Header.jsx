import React from 'react';
import styled from 'styled-components';
import Profile from './Profile';
import { useAuth } from '~features/auth/AuthContext'; // Koristi AuthContext

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
`;

function Header() {
  const { user } = useAuth();

  return (
    <HeaderContainer>
      <Logo>dokko filler</Logo>
      {user && <Profile />}
    </HeaderContainer>
  );
}

export default Header;
