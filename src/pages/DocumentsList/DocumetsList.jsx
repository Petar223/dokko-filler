import React, { useEffect } from 'react';
import styled from 'styled-components';
import DocumentItem from '~shared-components/DocumentItem/DocumentItem';
import useFetch from '~hooks/useFetch';
import getDocuments from '~api/getDocuments';
import { useNotification } from '~context/NotificationContext';
import Loading from '~shared-components/Loading/Loading';
import ErrorHandler from '~shared-components/ErrorHandler/ErrorHandler';

const DocumentsContainer = styled.div`
  padding: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 16px;
  margin-top: 32px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.primary.main};
  text-align: left;
  width: 100%;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[900]};
`;

const StateContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

function DocumentsList() {
  const { data: documents, loading, error } = useFetch(getDocuments);
  const showNotification = useNotification();
  const isValidDocumentsArray = Array.isArray(documents?.body);

  useEffect(() => {
    if (error) {
      showNotification(
        'Neuspešno učitavanje liste dokumenata. Molimo vas pokušajte opet.',
        5000,
        'error'
      );
    }
  }, [error]);

  if (documents?.length === 0)
    return (
      <StateContainerWrapper>
        <ErrorHandler message='Lista dokumenata je prazna.'></ErrorHandler>
      </StateContainerWrapper>
    );

  if (loading)
    return (
      <StateContainerWrapper>
        <Loading />
      </StateContainerWrapper>
    );

  if (error || !documents || !isValidDocumentsArray)
    return (
      <StateContainerWrapper>
        <ErrorHandler message='Neuspešno učitavanje liste ugovora.'></ErrorHandler>
      </StateContainerWrapper>
    );

  return (
    <DocumentsContainer>
      <Title>Ugovori</Title>
      <Wrapper>
        {documents?.body?.map((doc) => (
          <DocumentItem
            key={doc.id}
            name={doc.name}
            navigateTo={`create/${doc.name}/${doc.id}`}
          />
        ))}
      </Wrapper>
    </DocumentsContainer>
  );
}

export default DocumentsList;
