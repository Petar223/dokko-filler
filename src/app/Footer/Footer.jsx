import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  width: 100%;
  height: 5%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.businessBlue.dark};
  color: ${({ theme }) => theme.palette.businessBlue.contrastText};
  font-size: 0.875rem;
  padding: 8px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
`;

function Footer() {
  return (
    <FooterContainer>
      &copy; {new Date().getFullYear()} Dokko Filler
    </FooterContainer>
  );
}

export default Footer;
