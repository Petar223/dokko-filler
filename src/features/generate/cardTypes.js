import { hasValue } from '~lib/document/placeholders';

export const CARD_TYPE = {
  ID: 'licna_karta',
  VEHICLE: 'saobracajna_dozvola',
};

// `detectBy`: a field only this card type returns from the reader.
export const CARD_TYPES = {
  [CARD_TYPE.ID]: {
    label: 'Lična karta',
    detectBy: 'PersonalNumber',
    requiredFields: [
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
  },
  [CARD_TYPE.VEHICLE]: {
    label: 'Saobraćajna dozvola',
    detectBy: 'RegistrationNumberOfVehicle',
    requiredFields: [
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
  },
};

export const FIELD_LABELS = {
  PersonalNumber: 'JMBG',
  DocumentNumber: 'Broj dokumenta',
  Place: 'Mesto',
  GivenName: 'Ime',
  Surname: 'Prezime',
  DateOfBirth: 'Datum rođenja',
  PlaceOfBirth: 'Mesto rođenja',
  Street: 'Ulica',
  AddressNumber: 'Broj',
  Sex: 'Pol',
  RegistrationNumberOfVehicle: 'Registarski broj',
  VehicleCategory: 'Kategorija',
  VehicleMake: 'Marka',
  CommercialDescription: 'Model',
  YearOfProduction: 'Godina proizvodnje',
  EngineCapacity: 'Zapremina motora',
  OwnersSurnameOrBusinessName: 'Prezime / naziv vlasnika',
  OwnerName: 'Ime vlasnika',
  OwnerAddress: 'Adresa vlasnika',
};

// Returns null when the snapshot does not clearly belong to a known type.
export const detectCardType = (snapshot) =>
  Object.keys(CARD_TYPES).find((type) =>
    hasValue(snapshot?.[CARD_TYPES[type].detectBy])
  ) ?? null;

export const getMissingCardFields = (type, snapshot) =>
  (CARD_TYPES[type]?.requiredFields ?? []).filter(
    (field) => !hasValue(snapshot?.[field])
  );

// { GivenName: 'Ana' } + order 2 -> { GivenName_2: 'Ana' }
export const toOrderedFields = (snapshot, order) =>
  Object.fromEntries(
    Object.entries(snapshot).map(([key, value]) => [`${key}_${order}`, value])
  );

// Reader may return 'M', 'М' (Cyrillic), 'Muški', 'MUŠKO'...
export const isMale = (sex) => /^[MМ]/i.test(String(sex ?? '').trim());
