import React from "react";
import { Button } from "@mui/material";
import styled from "styled-components";
import { WebPageSourceCodeIcon } from "~components/Icons";

const ErrorContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.grey[500]};
  text-align: center;
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const StyledErrorIcon = styled(WebPageSourceCodeIcon)`
  height: 48px;
  fill: ${({ theme }) => theme.palette.grey[500]};
`;

const ErrorMessage = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

const ErrorDescription = styled.p`
  font-size: 1rem;
  margin: 0 0 16px;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const StyledButton = styled(Button)`
  text-transform: none;
  padding: 8px 16px;
  font-size: 1rem;
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
    this.resetError = this.resetError.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  resetError() {
    this.setState({ hasError: false, error: null, errorInfo: null });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContentContainer>
          <ErrorWrapper>
            <StyledErrorIcon />
            <ErrorMessage>Ups! Nešto je pošlo naopako.</ErrorMessage>
            <ErrorDescription>
              Došlo je do greške. Molimo vas, pokušajte ponovo kasnije.
            </ErrorDescription>
            <StyledButton
              onClick={this.resetError}
              variant="contained"
              color="primary"
            >
              Osveži stranicu
            </StyledButton>
          </ErrorWrapper>
        </ErrorContentContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
