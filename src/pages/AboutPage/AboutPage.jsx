import React from 'react';
import styled, { keyframes } from 'styled-components';
import { InfoCircleLineIcon } from '~components/Icons';

const pulseAnimation = keyframes`
  0% {
    transform: scale(0.8);
  }
 
  100% {
    transform: scale(1);
  }
`;

const AboutPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 24px;
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
  height: 100%;
  color: ${({ theme }) => theme.palette.text.primary};
  animation: ${pulseAnimation} 1.5s ease-in-out forwards;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.grey[500]};
  text-transform: uppercase;
  margin: 0;
`;

const StyledIcon = styled(InfoCircleLineIcon)`
  height: 48px;
  fill: ${({ theme }) => theme.palette.grey[500]};
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

function AboutPage() {
  return (
    <AboutPageContainer>
      <TitleContainer>
        <StyledIcon />
        <Title>O dokko-u</Title>
      </TitleContainer>
      <Description>
        Ova platforma služi za automatsko generisanje ugovora. Cilj aplikacije
        je da omogućimo brže i jednostavnije popunjavanje raznih tipova ugovora,
        čime se štedi vreme i povećava efikasnost u radu.
      </Description>
      <Description>
        Naš cilj je da unapredimo vašu produktivnost i pružimo korisničko
        iskustvo koje je intuitivno i prijatno.
      </Description>
    </AboutPageContainer>
  );
}

export default AboutPage;
