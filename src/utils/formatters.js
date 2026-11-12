// Field name prefixes (before `_N`) that are written as "Title Case".
export const FIELDS_FOR_FORMATTING = [
  'name',
  'Street',
  'Place',
  'GivenName',
  'Surname',
  'ParentGivenName',
  'PlaceOfBirth',
  'CommunityOfBirth',
  'StateOfBirth',
  'Community',
];

const capitalize = (word) =>
  word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : word;

// "MILAN PETROVIĆ-JOVANOVIĆ" -> "Milan Petrović-Jovanović", "d'ARC" -> "D'arc"
export const formatOnlyFirstUpper = (value) =>
  String(value ?? '')
    .split(' ')
    .map((word) => {
      const apostrophe = word.startsWith("'") ? "'" : '';
      return (
        apostrophe +
        word.slice(apostrophe.length).split('-').map(capitalize).join('-')
      );
    })
    .join(' ');

export const formatField = (key, value) =>
  FIELDS_FOR_FORMATTING.includes(key.split('_')[0])
    ? formatOnlyFirstUpper(value)
    : String(value ?? '');

export const getCurrentDate = (date = new Date()) =>
  date.toLocaleDateString('sr-RS', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
