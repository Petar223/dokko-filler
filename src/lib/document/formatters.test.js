import {
  formatField,
  formatOnlyFirstUpper,
  getCurrentDate,
} from './formatters';

describe('formatOnlyFirstUpper', () => {
  it.each([
    [null, ''],
    [undefined, ''],
    [42, '42'],
    ['MILAN ILIĆ', 'Milan Ilić'],
    ['petrović-jovanović', 'Petrović-Jovanović'],
    ["d'ARC", "D'arc"],
  ])('%p -> %p', (input, expected) => {
    expect(formatOnlyFirstUpper(input)).toBe(expected);
  });
  it('capitalizes the letter after a leading apostrophe', () => {
    expect(formatOnlyFirstUpper("'ADA")).toBe("'Ada");
  });
});

describe('formatField', () => {
  it('formats only listed fields', () => {
    expect(formatField('GivenName_1', 'ANA')).toBe('Ana');
    expect(formatField('DocumentNumber_1', 'rs012')).toBe('rs012');
  });
});

it('getCurrentDate uses sr-RS format', () => {
  expect(getCurrentDate(new Date(2025, 2, 4))).toMatch(/04\.\s?03\.\s?2025/);
});
