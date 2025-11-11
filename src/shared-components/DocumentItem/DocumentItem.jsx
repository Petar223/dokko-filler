import React from "react";
import styled from "styled-components";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FileLineIcon } from "~components/Icons";

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.background.white};
  height: 200px;
`;

const StyledCard = styled(Card)`
  width: 300px;
  border: 1px solid ${({ theme }) => theme.palette.grey[900]};
  &.MuiCard-root {
    box-shadow: none;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${({ theme }) => theme.palette.primary.light};
`;

const StyledFileLineIcon = styled(FileLineIcon)`
  height: 120px;
  fill: ${({ theme }) => theme.palette.grey[700]};
`;

const CardContentWrapper = styled(CardContent)`
  display: flex;
  height: 140px;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledTypography = styled(Typography)`
  font-weight: 700;
`;

function DocumentItem({ name, navigateTo, onAction, actionLabel = "Napravi Ugovor" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onAction) {
      onAction();
      return;
    }

    if (navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <StyledCard>
      <IconContainer>
        <StyledFileLineIcon />
      </IconContainer>
      <CardContentWrapper>
        <StyledTypography component="div">{name}</StyledTypography>
        <StyledButton variant="contained" onClick={handleClick}>
          {actionLabel}
        </StyledButton>
      </CardContentWrapper>
    </StyledCard>
  );
}

export default DocumentItem;
