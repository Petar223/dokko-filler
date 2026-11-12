import { cyrilicToLatin, latinToCyrilic } from 'serbian-script-converter';

export const LETTER = { LATIN: 1, CYRILLIC: 2 };

// Identifiers that must keep their original script (e.g. BG-123-AB must not
// become БГ-123-АБ).
// ponytail: list agreed provisionally; confirm with business which fields stay.
export const SCRIPT_EXEMPT_FIELDS = [
  'RegistrationNumberOfVehicle',
  'DocumentNumber',
  'PersonalNumber',
];

// `letter` comes from the API and may be a number or a string.
export const convertFieldsScript = (fields, letter) => {
  const toLatin = Number(letter) === LETTER.LATIN;
  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => {
      if (typeof value !== 'string') return [key, value];
      if (SCRIPT_EXEMPT_FIELDS.includes(key.split('_')[0])) return [key, value];
      return [key, toLatin ? cyrilicToLatin(value) : latinToCyrilic(value)];
    })
  );
};
