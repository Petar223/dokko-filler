import React from "react";
import styled from "styled-components";
import { CarDocumentIcon } from "~components/Icons";
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

const InfoRow = styled(({ label, value, className }) => (
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

const VehicleDetailsContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.grey[900]};
  padding: 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const OwnerRow = styled(({ label, value, className }) => (
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

function VehicleCardID({ data, onRemove, order, showRemoveAction = true }) {
  const getKey = (key) => `${key}_${order}`;

  if (!data) return null;

  return (
    <CardContainer>
      <Header>
        <ProfileIcon>
          <CarDocumentIcon />
        </ProfileIcon>
        <DocumentType>Saobraćajna dozvola</DocumentType>
        {showRemoveAction && onRemove && (
          <StyledIconButton onClick={onRemove} aria-label="Delete">
            <RecycleBinIcon />
          </StyledIconButton>
        )}
      </Header>
      <InfoRow
        label="Broj registracije"
        value={data[getKey("RegistrationNumberOfVehicle")] || "N/A"}
      />
      <InfoRow
        label="Tip vozila"
        value={data[getKey("VehicleCategory")] || "N/A"}
      />
      <InfoRow
        label="Proizvođač"
        value={data[getKey("VehicleMake")] || "N/A"}
      />
      <InfoRow
        label="Model"
        value={data[getKey("CommercialDescription")] || "N/A"}
      />
      <InfoRow
        label="Godina proizvodnje"
        value={data[getKey("YearOfProduction")] || "N/A"}
      />
      <InfoRow
        label="Zapremina motora"
        value={data[getKey("EngineCapacity")] || "N/A"}
      />
      <VehicleDetailsContainer>
        <OwnerRow
          label="Vlasnik"
          value={`${data[getKey("OwnersSurnameOrBusinessName")] || "N/A"} ${data[getKey("OwnerName")] || ""}`}
        />
        <OwnerRow
          label="Adresa"
          value={data[getKey("OwnerAddress")] || "N/A"}
        />
      </VehicleDetailsContainer>
    </CardContainer>
  );
}

export default VehicleCardID;
