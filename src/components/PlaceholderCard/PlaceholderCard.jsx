import React from "react";
import styled from "styled-components";
import Loading from "~shared-components/Loading/Loading";
import { PlusRoundLineIcon } from "~components/Icons";

const CardContainer = styled.div`
  width: 400px;
  height: 450px;
  border: 2px dashed ${({ theme }) => theme.palette.grey[400]};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  position: relative;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey[900]};
    transform: scale(1.05);
  }
`;

const IconContainer = styled.div`
  position: relative;
  width: 50px;
  height: 50px;

  & > .old-icon {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
    opacity: 1;
    transform: scale(1);
    fill: ${({ theme }) => theme.palette.grey[500]};
  }

  & > .new-icon {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
    opacity: 0;
    transform: scale(0.8);
    fill: ${({ theme }) => theme.palette.grey[500]};
  }

  ${CardContainer}:hover & > .old-icon {
    opacity: 0;
    transform: scale(0.8);
  }

  ${CardContainer}:hover & > .new-icon {
    opacity: 1;
    transform: scale(1);
  }
`;

const PlaceholderText = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const PlaceholderCard = ({ icon: Icon, name, onClick, loading }) => {
  return (
    <CardContainer onClick={onClick}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <IconContainer>
            <Icon className="old-icon" />
            <PlusRoundLineIcon className="new-icon" />
          </IconContainer>
          <PlaceholderText>{name}</PlaceholderText>
        </>
      )}
    </CardContainer>
  );
};

export default PlaceholderCard;
