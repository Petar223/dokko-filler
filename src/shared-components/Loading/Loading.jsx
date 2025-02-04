import React from "react";
import styled, { keyframes } from "styled-components";
import { ActivityLogIcon } from "~components/Icons";

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.grey[700]};
  animation: ${pulseAnimation} 1.5s ease-in-out infinite;
  overflow: hidden;
  position: initial;
`;

const AnimatedIcon = styled(ActivityLogIcon)`
  width: 48px;
  height: 48px;
  fill: ${({ theme }) => theme.palette.grey[700]};
`;

function Loading({ text = "Učitavanje" }) {
  return (
    <LoadingContainer>
      {text}
      <AnimatedIcon />
    </LoadingContainer>
  );
}

export default Loading;
