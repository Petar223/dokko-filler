import React from "react";
import styled, { keyframes } from "styled-components";
import { FileLineIcon } from "~components/Icons";

const pulseAnimation = keyframes`
  0% {
    transform: scale(0.8);
  }
 
  100% {
    transform: scale(1);
  }
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  gap: 24px;
  padding: 20px;
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
  animation: ${pulseAnimation} 1.5s ease-in-out forwards;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.grey[500]};
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 600px;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  margin-bottom: 16px;

  & > svg {
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => theme.palette.grey[500]};
  }
`;

const CTAButton = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: ${({ theme }) => theme.palette.primary.main};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
    transform: scale(1.05);
  }
`;

function HomePage() {
  return (
    <HomeContainer>
      <IconWrapper>
        <FileLineIcon />
      </IconWrapper>
      <Title>Dobrodošli u Dokko Filler</Title>
      <Description>
        Ova platforma vam omogućava lako i brzo generisanje ugovora. Kreirajte i
        pregledajte ugovore na jednom mestu uz maksimalnu efikasnost i
        intuitivno korisničko iskustvo.
      </Description>
      <CTAButton onClick={() => (window.location.href = "/documents")}>
        Pregledaj ugovore
      </CTAButton>
    </HomeContainer>
  );
}

export default HomePage;
