import Mammoth from 'mammoth';

const PLACEHOLDER = /{{\s*([\w]+)\s*}}/g;
const CASE_PLACEHOLDER = /^(\w+)_p([1-7])_(\d+)$/;

export const hasValue = (value) =>
  value !== undefined && value !== null && String(value).trim() !== '';

// Raw text keeps Word runs joined, so split placeholders are still found.
export const extractText = async (arrayBuffer) =>
  (await Mammoth.extractRawText({ arrayBuffer })).value;

export const extractPlaceholderNames = (text) => [
  ...new Set([...text.matchAll(PLACEHOLDER)].map((m) => m[1])),
];

// `{{GivenName_p3_1}}` -> request to inflect fields.GivenName_1 to case p3.
// Placeholders without a source value are skipped (nothing to inflect).
export const getCaseRequests = (names, fields) =>
  names
    .map((name) => name.match(CASE_PLACEHOLDER))
    .filter(Boolean)
    .map(([placeholder, field, caseNo, order]) => ({
      placeholder,
      noun: fields[`${field}_${order}`],
      case: `p${caseNo}`,
    }))
    .filter((req) => hasValue(req.noun));

export const getMissingFields = (names, fields) =>
  names.filter((name) => !hasValue(fields[name]));
