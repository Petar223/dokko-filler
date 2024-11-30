import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import DocumentRenderer from './DocumentRenderer/DocumentRenderer';
import read from '~api/read';
import getDocumentById from '~api/getDocumentById';
import { useNotification } from '~context/NotificationContext';
import useLazyFetch from '~hooks/useLazyFetch';
import useFetch from '~hooks/useFetch';
import ErrorHandler from '~shared-components/ErrorHandler/ErrorHandler';
import Loading from '~shared-components/Loading/Loading';
import cardsConfig from './config/cardsConfig';
const CreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  text-align: center;
  gap: 16px;
  padding: 20px;
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
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

const SubTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.secondary};
  text-align: left;
  width: 100%;
  margin-bottom: 8px;
`;

const PlaceholderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 24px;
  width: 100%;
`;

const StateContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

function CreateDocument() {
  const { id } = useParams();
  const { name } = useParams();
  const showNotification = useNotification();
  const fetchDocument = useCallback(() => getDocumentById(id), [id]);
  const removeSpaces = (str) => str.replace(/\s+/g, '');
  const [currentCardName, setCurrentCardName] = useState(null);

  const [
    runFetchCard,
    {
      data: cardData,
      error: cardError,
      loading: fetchCardLoading,
      resetData: resetCardData,
    },
  ] = useLazyFetch(read);

  const {
    data: document,
    loading: documentLoading,
    error: fetchDocumentError,
  } = useFetch(fetchDocument);

  const [cardsData, setCardsData] = useState(
    Object.fromEntries(
      (document?.body?.needed_cards || []).map((card) => [
        removeSpaces(card.name),
        null,
      ])
    )
  );

  const filteredCards = useMemo(() => {
    return document?.body?.needed_cards
      ?.map((requiredCard) =>
        cardsConfig?.find((card) => card.name === requiredCard.name)
      )
      .filter(Boolean);
  }, [document, cardsConfig]);

  useEffect(() => {
    if (cardError && currentCardName) {
      showNotification(
        `Neuspešno učitavanje dokumenta. Molimo vas pokušajte opet.`,
        5000,
        'error'
      );
    }

    if (cardData && currentCardName) {
      setCardsData((prev) => ({
        ...prev,
        [currentCardName]: cardData,
      }));
      setCurrentCardName(null);
    }
  }, [cardData, currentCardName, cardError]);

  useEffect(() => {
    if (fetchDocumentError) {
      showNotification(
        'Neuspešno učitavanje ugovora. Molimo vas pokušajte opet.',
        5000,
        'error'
      );
    }
  }, [fetchDocumentError]);

  const handleClick = (cardName) => {
    setCurrentCardName(removeSpaces(cardName));
    resetCardData();
    runFetchCard();
  };

  const handleRemove = (cardName) => {
    setCardsData((prev) => ({
      ...prev,
      [removeSpaces(cardName)]: null,
    }));
  };

  if (fetchDocumentError)
    return (
      <StateContainerWrapper>
        <ErrorHandler message={'Neuspešno učitavanje ugovora.'}></ErrorHandler>
      </StateContainerWrapper>
    );

  if (documentLoading)
    return (
      <StateContainerWrapper>
        <Loading />
      </StateContainerWrapper>
    );

  return (
    <CreateContainer>
      <Title>{name}</Title>

      <SubTitle>Neophodna dokumenta</SubTitle>
      <PlaceholderContainer>
        {filteredCards.map((card, index) => (
          <DocumentRenderer
            key={index}
            type={card.type}
            data={cardsData[removeSpaces(card.name)]}
            onClick={() => handleClick(card.name)}
            onRemove={() => handleRemove(card.name)}
            text={card.text}
            loading={fetchCardLoading}
            dataData={cardsData}
          />
        ))}
      </PlaceholderContainer>
    </CreateContainer>
  );
}

export default CreateDocument;
