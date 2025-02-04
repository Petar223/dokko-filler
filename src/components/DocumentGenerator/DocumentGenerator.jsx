import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Mammoth from "mammoth";
import DocumentModal from "~components/DocumentModal/DocumentModal";
import {
  addCustomFields,
  fillWordDocument,
  extractPlaceholders,
} from "~utils/documentUtils";
import { getDocForm, downloadFile } from "~utils/fileDownloader";
import { OverviewIcon } from "~components/Icons";
import postPlaceholder from "~api/postPlaceholder";
import CircularProgress from "@mui/material/CircularProgress";

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px; /* Razmak između dugmadi */
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.palette.grey[700]};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

const StyledOverviewIcon = styled(OverviewIcon)`
  width: 24px;
  height: 24px;
  fill: ${({ theme }) => theme.palette.primary.contrastText};
`;

function DocumentGenerator({ templateURL, readFields }) {
  const [docContent, setDocContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [downloadBlob, setDownloadBlob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAndConvertDocument = async (templateURL) => {
    const docS3Bytes = await getDocForm(templateURL);
    const docTextArrayBuffer = await new Blob([docS3Bytes]).arrayBuffer();
    const documentContent = await Mammoth.convertToHtml({
      arrayBuffer: docTextArrayBuffer,
    });
    return { docS3Bytes, documentContent };
  };

  const processPlaceholders = async (documentContent, enrichedFields) => {
    const placeholders = extractPlaceholders(
      documentContent.value,
      enrichedFields,
    );

    const transformedFieldsArray = await Promise.all(
      placeholders.map((placeholder) => postPlaceholder(placeholder)),
    );

    const transformedFields = Object.assign({}, ...transformedFieldsArray);
    return { ...enrichedFields, ...transformedFields };
  };

  const fillDocumentAndCreateBlob = async (docS3Bytes, enrichedFields) => {
    const filledBytes = await fillWordDocument(docS3Bytes, enrichedFields);
    return new Blob([filledBytes], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
  };

  const generateAndDisplayDoc = async () => {
    setIsLoading(true);
    try {
      const enrichedFields = addCustomFields(readFields);

      const { docS3Bytes, documentContent } =
        await fetchAndConvertDocument(templateURL);

      const enrichedFieldsWithTransforms = await processPlaceholders(
        documentContent,
        enrichedFields,
      );

      const filledBlob = await fillDocumentAndCreateBlob(
        docS3Bytes,
        enrichedFieldsWithTransforms,
      );

      setDownloadBlob(filledBlob);

      const arrayBuffer = await filledBlob.arrayBuffer();
      const result = await Mammoth.convertToHtml({ arrayBuffer });
      setDocContent(result.value);
      setShowModal(true);
    } catch (error) {
      console.error("Error generating document:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (downloadBlob) {
      const fileName = `filled-document.docx`;
      downloadFile(downloadBlob, fileName);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleBack = () => {
    navigate("/documents");
  };

  return (
    <>
      <ButtonContainer>
        <BackButton onClick={handleBack}>Nazad</BackButton>
        <Button onClick={generateAndDisplayDoc} disabled={isLoading}>
          {isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <>
              <StyledOverviewIcon />
              Pregledaj dokument
            </>
          )}
        </Button>
      </ButtonContainer>

      {showModal && (
        <DocumentModal
          docContent={docContent}
          handleDownload={handleDownload}
          closeModal={closeModal}
          isLoading={isLoading}
        />
      )}
    </>
  );
}

export default DocumentGenerator;
