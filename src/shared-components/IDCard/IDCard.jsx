import React from "react";
import styled from "styled-components";
import { YoungBusinessmanIcon } from "~components/Icons";
import { BusinessWomanWithTieIcon } from "~components/Icons";
import { RecycleBinIcon } from "~components/Icons";
import IconButton from "@mui/material/IconButton";

const CardContainer = styled.div`
  width: 400px;
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.lightGrey[700]};
  border: 1px solid ${({ theme }) => theme.palette.grey[700]};
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: "Arial", sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid ${({ theme }) => theme.palette.grey[500]};
  padding-bottom: 16px;
`;

const ProfileIcon = styled.div`
  width: 80px;
  height: 80px;

  & > svg {
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => theme.palette.grey[400]};
  }
`;

const DocumentType = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.grey[500]};
`;

const StyledIconButton = styled(IconButton)`
  position: relative;
  top: -32px;
  right: -16px;
  color: ${({ theme }) => theme.palette.error.main};
  &:hover {
    color: ${({ theme }) => theme.palette.error.dark};
  }
`;

const AddressContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.grey[900]};
  padding: 12px;
  border-radius: 8px;
  font-size: 0.9rem;
`;

const Row = styled(({ label, value, className }) => (
  <div className={className}>
    <span>{label}:</span>
    <span>{value}</span>
  </div>
))`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.text.primary};

  span:first-child {
    font-weight: bold;
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`;

const AdressRow = styled(({ label, value, className }) => (
  <div className={className}>
    <span>{label}:</span>
    <span>{value}</span>
  </div>
))`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.text.primary};

  span:first-child {
    font-weight: bold;
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`;

function IDCard({ data, onRemove, order, showRemoveAction = true }) {
  if (!data) return null;

  const getKey = (key) => `${key}_${order}`;
  const isMale = data[getKey("Sex")] === "M";

  return (
    <CardContainer>
      <Header>
        <ProfileIcon>
          {isMale ? <YoungBusinessmanIcon /> : <BusinessWomanWithTieIcon />}
        </ProfileIcon>
        <DocumentType>
          {data[getKey("DocumentType")] || "Lična karta"}
        </DocumentType>
        {showRemoveAction && onRemove && (
          <StyledIconButton onClick={onRemove} aria-label="Delete">
            <RecycleBinIcon />
          </StyledIconButton>
        )}
      </Header>
      <Row label="Broj lične karte" value={data[getKey("DocumentNumber")]} />
      <Row
        label="Ime i prezime"
        value={`${data[getKey("GivenName")]} ${data[getKey("Surname")]}`}
      />
      <Row label="Datum rođenja" value={data[getKey("DateOfBirth")]} />
      <Row label="Mesto rođenja" value={data[getKey("PlaceOfBirth")]} />
      <Row label="JMBG" value={data[getKey("PersonalNumber")]} />
      <AddressContainer>
        <AdressRow
          label="Adresa prebivališta"
          value={`${data[getKey("Street")]} ${data[getKey("AddressNumber")]} ${data[getKey("Place")]}`}
        />
      </AddressContainer>
    </CardContainer>
  );
}

export default IDCard;
