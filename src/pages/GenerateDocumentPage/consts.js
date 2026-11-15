import { hasValue } from '~utils/placeholders';
// Shared with scripts/checkTemplate.js.
import CARD_FIELDS from './cardFields.json';

export const CARD_TYPE = {
  ID: 'licna_karta',
  VEHICLE: 'saobracajna_dozvola',
};

// `detectBy`: a field only this card type returns from the reader.
// Labels live in the locale files: `cardType.<type>` and `field.<Field>`.
export const CARD_TYPES = {
  [CARD_TYPE.ID]: {
    detectBy: 'PersonalNumber',
    requiredFields: CARD_FIELDS[CARD_TYPE.ID],
  },
  [CARD_TYPE.VEHICLE]: {
    detectBy: 'RegistrationNumberOfVehicle',
    requiredFields: CARD_FIELDS[CARD_TYPE.VEHICLE],
  },
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
