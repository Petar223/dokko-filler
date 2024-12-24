import React, { useState } from 'react';
import styled from 'styled-components';
import Mammoth from 'mammoth';
import DocumentModal from '~components/DocumentModal/DocumentModal';
import { formatOnlyFirstUpper } from '~utils/util';
import { cyrilicToLatin } from 'serbian-script-converter';
import { getDocForm, downloadFile } from '~utils/fileDownloader';
import { PatchType, TextRun, patchDocument } from 'docx';
import { fieldsForFormating } from './consts';
import { OverviewIcon } from '~components/Icons';

const GenerateButton = styled.button`
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

const StyledOverviewIcon = styled(OverviewIcon)`
  width: 24px;
  height: 24px;
  fill: ${({ theme }) => theme.palette.primary.contrastText};
`;

function DocumentGenerator({ templateURL, readFields }) {
  const [docContent, setDocContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [downloadBlob, setDownloadBlob] = useState(null);

  function getCurrentDate() {
    const today = new Date();
    return today.toLocaleDateString('sr-RS', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  function addCustomFields(fields) {
    const updatedFields = { ...fields };
    updatedFields['name_1'] = cyrilicToLatin(
      `${fields['GivenName_1']} ${fields['Surname_1']}`
    );
    updatedFields['name_2'] = cyrilicToLatin(
      `${fields['GivenName_2']} ${fields['Surname_2']}`
    );
    updatedFields['IssuingAuthority_1'] = cyrilicToLatin(
      `${fields['IssuingAuthority_1']}`
    );
    updatedFields['IssuingAuthority_2'] = cyrilicToLatin(
      `${fields['IssuingAuthority_2']}`
    );
    updatedFields['date'] = getCurrentDate();
    return updatedFields;
  }

  function formatField(key, value) {
    const fieldName = key.split('_')[0];
    return fieldsForFormating.includes(fieldName)
      ? formatOnlyFirstUpper(value)
      : value;
  }

  async function fillWordDocument(wordBin, readFields) {
    const patches = {};
    Object.keys(readFields).forEach((key) => {
      const val = formatField(key, readFields[key]);
      patches[key] = {
        type: PatchType.PARAGRAPH,
        children: [new TextRun({ text: val, underline: { type: 'single' } })],
      };
    });

    const res = await patchDocument(wordBin, { patches });
    return res;
  }

  const generateAndDisplayDoc = async () => {
    try {
      const enrichedFields = addCustomFields(readFields);
      const docS3Bytes = await getDocForm(templateURL);
      const filledBytes = await fillWordDocument(docS3Bytes, enrichedFields);
      const filledBlob = new Blob([filledBytes], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      setDownloadBlob(filledBlob);

      const arrayBuffer = await filledBlob.arrayBuffer();
      const result = await Mammoth.convertToHtml({ arrayBuffer });
      setDocContent(result.value);
      setShowModal(true);
      console.log(readFields);
    } catch (error) {
      console.error('Error generating document:', error);
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

  return (
    <>
      <GenerateButton onClick={generateAndDisplayDoc}>
        <StyledOverviewIcon />
        Pregledaj dokument
      </GenerateButton>

      {showModal && (
        <DocumentModal
          docContent={docContent}
          handleDownload={handleDownload}
          closeModal={closeModal}
        />
      )}
    </>
  );
}

export default DocumentGenerator;
