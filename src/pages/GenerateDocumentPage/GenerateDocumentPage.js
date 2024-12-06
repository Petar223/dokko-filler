import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import getDocumentById from '~api/getDocumentById';
import { useNotification } from '~context/NotificationContext';
import useFetch from '~hooks/useFetch';
import ErrorHandler from '~shared-components/ErrorHandler/ErrorHandler';
import Loading from '~shared-components/Loading/Loading';
import DocumentRenderer from '~components/DocumentRender/DocumentRender';
import useLazyFetch from '~hooks/useLazyFetch';
import read from '~api/read';

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

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const requiredFieldsMap = {
  licna_karta: [
    'PersonalNumber',
    'DocumentNumber',
    'Place',
    'GivenName',
    'Surname',
    'DateOfBirth',
    'PlaceOfBirth',
    'Street',
    'AddressNumber',
    'Sex',
  ],
  saobracajna_dozvola: [
    'RegistrationNumberOfVehicle',
    'VehicleCategory',
    'VehicleMake',
    'CommercialDescription',
    'YearOfProduction',
    'EngineCapacity',
    'OwnersSurnameOrBusinessName',
    'OwnerName',
    'OwnerAddress',
  ],
};

function GenerateDocumentPage() {
  const { id } = useParams();
  const { name } = useParams();
  const showNotification = useNotification();
  const fetchDocument = useCallback(() => getDocumentById(id), [id]);
  const [cardData, setCardData] = useState({});
  const [selectedType, setSelectedType] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [
    runFetchCard,
    {
      data: card,
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

  useEffect(() => {
    if (fetchDocumentError) {
      showNotification(
        'Neuspešno učitavanje ugovora. Molimo vas pokušajte opet.',
        5000,
        'error'
      );
    }
  }, [fetchDocumentError]);

  useEffect(() => {
    if (cardError) {
      showNotification(
        `Neuspešno učitavanje dokumenta. Molimo vas pokušajte opet ili ubacite dokument u citac kartica.`,
        5000,
        'error'
      );
    }
  }, [cardError]);

  useEffect(() => {
    if (card && selectedType && selectedOrder) {
      console.log('Učitani podaci za karticu:', card);

      const updatedCardData = {};
      const requiredFields = requiredFieldsMap[selectedType];

      if (!requiredFields) {
        console.error(`Nepoznat tip kartice: ${selectedType}`);
        return;
      }

      requiredFields.forEach((field) => {
        if (card[field]) {
          updatedCardData[`${field}_${selectedOrder}`] = card[field];
        } else {
          console.warn(`Polje nedostaje: ${field}`);
        }
      });

      setCardData((prevState) => ({
        ...prevState,
        ...updatedCardData,
      }));

      resetCardData();
    }
  }, [card, selectedType, selectedOrder]);

  const handleCardRemove = (type, order) => {
    setCardData((prevState) => {
      const updatedState = { ...prevState };
      const requiredFields = requiredFieldsMap[type];
      requiredFields.forEach((field) => {
        const key = `${field}_${order}`;
        delete updatedState[key];
      });
      return updatedState;
    });
  };

  const handleCardClick = (type, order) => {
    setSelectedType(type);
    setSelectedOrder(order);
    runFetchCard();
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
      <Header>
        <Title>{name}</Title>
      </Header>
      <SubTitle>Učitaj neophodna dokumenta</SubTitle>
      <PlaceholderContainer>
        {document.body.needed_cards?.map((card) => (
          <DocumentRenderer
            key={card.order}
            type={card.type}
            name={card.name}
            data={cardData}
            onClick={() => handleCardClick(card.type, card.order)}
            onRemove={() => handleCardRemove(card.type, card.order)}
            loading={fetchCardLoading}
            order={card.order}
            requiredFieldsMap={requiredFieldsMap}
          />
        ))}
      </PlaceholderContainer>
    </CreateContainer>
  );
}

export default GenerateDocumentPage;
