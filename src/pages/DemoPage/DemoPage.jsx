import React, { useState } from 'react';
import styled from 'styled-components';
import DocumentRenderer from '~components/DocumentRender/DocumentRender';
import DocumentGenerator from '~components/DocumentGenerator/DocumentGenerator';
import DocumentItem from '~shared-components/DocumentItem/DocumentItem';
import { requiredFieldsMap } from '~pages/GenerateDocumentPage/consts';
import ErrorHandler from '~shared-components/ErrorHandler/ErrorHandler';
import { useNotification } from '~context/NotificationContext';
import Loading from '~shared-components/Loading/Loading';
import { DEMO_DOCUMENTS, mockReadCard } from './demoData';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
  padding: 20px;
`;

const HeaderSection = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[900]};
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 0;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const Subtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.palette.text.secondary};
  max-width: 720px;
`;

const HighlightList = styled.ul`
  margin: 0;
  padding-left: 20px;
  color: ${({ theme }) => theme.palette.text.primary};
  li {
    margin-bottom: 4px;
  }
`;

const DocumentsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 16px;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  padding: 20px;
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
`;

const DetailHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[900]};
  gap: 16px;
  flex-wrap: wrap;
`;

const DetailTitle = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const DetailSubTitleContainer = styled.div`
  width: 100%;
  margin-bottom: 8px;
`;

const DetailSubTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.secondary};
  margin: 0;
`;

const PlaceholderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 24px;
  width: 100%;
`;

const EmptyStateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const mapCardToState = (card, order) =>
  Object.entries(card).reduce((acc, [key, value]) => {
    acc[`${key}_${order}`] = value;
    return acc;
  }, {});

const DemoDocumentFlow = ({ document, onExit }) => {
  const showNotification = useNotification();
  const [cardData, setCardData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleCardClick = async (card) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const snapshot = await mockReadCard(card.order);
      setCardData((prev) => ({
        ...prev,
        ...mapCardToState(snapshot, card.order),
      }));
      showNotification(
        `${card.name} učitana iz demo podataka.`,
        3000,
        'success'
      );
    } catch (error) {
      showNotification(error.message, 4000, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExit = () => {
    setCardData({});
    onExit();
  };

  return (
    <DetailWrapper>
      <DetailHeader>
        <DetailTitle>{document.name}</DetailTitle>
        <DocumentGenerator
          readFields={cardData}
          templateURL={document.templateURL}
          letterType={document.letter}
          documentName={document.name}
          onBack={handleExit}
        />
      </DetailHeader>
      <DetailSubTitleContainer>
        <DetailSubTitle>Ucitaj neophodna dokumenta</DetailSubTitle>
      </DetailSubTitleContainer>
      <PlaceholderContainer>
        {document.neededCards.map((card) => (
          <DocumentRenderer
            key={card.order}
            type={card.type}
            name={card.name}
            order={card.order}
            onClick={() => handleCardClick(card)}
            data={cardData}
            loading={isLoading}
            requiredFieldsMap={requiredFieldsMap}
            showRemoveAction={false}
          />
        ))}
      </PlaceholderContainer>
    </DetailWrapper>
  );
};

function DemoPage() {
  const [selectedDocument, setSelectedDocument] = useState(null);

  if (!DEMO_DOCUMENTS.length) {
    return (
      <EmptyStateWrapper>
        <ErrorHandler message='Demo lista ugovora trenutno nije dostupna.' />
      </EmptyStateWrapper>
    );
  }

  return (
    <PageWrapper>
      {!selectedDocument ? (
        <>
          <HeaderSection>
            <Title>Ugovori</Title>
            <Subtitle>
              Demo prikaz liste ugovora sa unapred pripremljenim podacima.
              Izaberite ugovor da pokrenete ceo proces bez prijave i ucitavanja
              dokumenata.
            </Subtitle>
          </HeaderSection>
          <DocumentsGrid>
            {DEMO_DOCUMENTS.map((document) => (
              <DocumentItem
                key={document.id}
                name={document.name}
                onAction={() => setSelectedDocument(document)}
                actionLabel='Pokreni demo'
              />
            ))}
          </DocumentsGrid>
        </>
      ) : (
        <React.Suspense
          fallback={
            <EmptyStateWrapper>
              <Loading />
            </EmptyStateWrapper>
          }
        >
          <DemoDocumentFlow
            document={selectedDocument}
            onExit={() => setSelectedDocument(null)}
          />
        </React.Suspense>
      )}
    </PageWrapper>
  );
}

export default DemoPage;
