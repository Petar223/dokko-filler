import React from "react";
import styled from "styled-components";
import { TextDocumentRemoveIcon } from "~components/Icons";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 12px;
  padding: 24px;
  color: ${({ theme }) => theme.palette.grey[700]};
  border-radius: 8px;
  max-width: 400px;
  height: 150px;
  margin: auto auto;
`;

const ErrorMessage = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const StyledErrorIcon = styled(TextDocumentRemoveIcon)`
  height: 48px;
  fill: ${({ theme }) => theme.palette.grey[700]};
`;

function ErrorHandler({ message = "Došlo je do greške" }) {
  return (
    <ErrorContainer>
      <StyledErrorIcon />
      <ErrorMessage>{message}</ErrorMessage>
    </ErrorContainer>
  );
}

export default ErrorHandler;
