import React from "react";
import styled from "styled-components";
import { BrowserError404Icon } from "~components/Icons";
import { useNavigate } from "react-router-dom";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  gap: 12px;
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
`;

const StyledIcon = styled(BrowserError404Icon)`
  height: 70px;
  fill: ${({ theme }) => theme.palette.grey[700]};
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.grey[700]};
`;

const StyledButton = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: ${({ theme }) => theme.palette.primary.main};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <NotFoundContainer>
      <StyledIcon />
      <Title>Stranica nije pronađena</Title>
      <StyledButton variant="contained" onClick={() => navigate("/")}>
        Idi na Poačetak
      </StyledButton>
    </NotFoundContainer>
  );
}

export default PageNotFound;
