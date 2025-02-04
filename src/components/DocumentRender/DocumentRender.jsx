import React from "react";
import PlaceholderCard from "../PlaceholderCard/PlaceholderCard";
import IDCard from "~shared-components/IDCard/IDCard";
import VehicleCardID from "~shared-components/VehicleCardID/VehicleCardID";
import { IdProofLineIcon, CarDocumentIcon } from "~components/Icons";

const DocumentRenderer = ({
  type,
  data,
  onClick,
  name,
  onRemove,
  order,
  requiredFieldsMap,
  loading,
}) => {
  const isCardFilled = (type, data, order) => {
    const requiredFields = requiredFieldsMap[type]?.map(
      (field) => `${field}_${order}`,
    );

    if (!requiredFields || !data) return false;

    return requiredFields.every((field) => data[field]);
  };

  if (!isCardFilled(type, data, order)) {
    return (
      <PlaceholderCard
        icon={type === "licna_karta" ? IdProofLineIcon : CarDocumentIcon}
        name={name}
        onClick={onClick}
        loading={loading}
      />
    );
  }

  return (
    <div>
      {type === "saobracajna_dozvola" ? (
        <VehicleCardID data={data} onRemove={onRemove} order={order} />
      ) : (
        <IDCard data={data} onRemove={onRemove} order={order} />
      )}
    </div>
  );
};

export default DocumentRenderer;
