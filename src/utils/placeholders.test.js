import {
  extractPlaceholderNames,
  getCaseRequests,
  getMissingFields,
} from './placeholders';

const text =
  'Kupac {{name_2}}, od {{GivenName_p2_1}} i {{GivenName_p2_1}}, {{Street_1}} {{date}} {{ bad }}';

it('extracts unique placeholder names', () => {
  expect(extractPlaceholderNames(text)).toEqual([
    'name_2',
    'GivenName_p2_1',
    'Street_1',
    'date',
  ]);
});

it('builds deduplicated case requests and skips empty nouns', () => {
  const names = [...extractPlaceholderNames(text), 'Surname_p3_9'];
  expect(getCaseRequests(names, { GivenName_1: 'Milan' })).toEqual([
    { placeholder: 'GivenName_p2_1', noun: 'Milan', case: 'p2' },
  ]);
});

it('reports placeholders without a value', () => {
  expect(
    getMissingFields(['name_2', 'date', 'Street_1'], {
      date: '1.1.',
      Street_1: ' ',
    })
  ).toEqual(['name_2', 'Street_1']);
});
