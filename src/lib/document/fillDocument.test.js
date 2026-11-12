/**
 * @jest-environment node
 */
import fs from 'fs';
import path from 'path';
import { DEMO_CARD_SNAPSHOTS } from '~features/demo/demoData';
import { toOrderedFields } from '~features/generate/cardTypes';
import { addCustomFields, fillDocument } from './fillDocument';
import {
  extractPlaceholderNames,
  extractText,
  getMissingFields,
} from './placeholders';

// The app runs the browser build of mammoth (accepts arrayBuffer); mirror it.
jest.mock('mammoth', () => jest.requireActual('mammoth/mammoth.browser'));

const template = fs.readFileSync(
  path.resolve(__dirname, '../../../public/assets/demo/demo-contract.docx')
);
const toArrayBuffer = (buf) =>
  buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

describe('addCustomFields', () => {
  it('derives name_N for every card and the date', () => {
    const result = addCustomFields(
      { GivenName_1: 'Milan', Surname_1: 'Ilić', GivenName_4: 'Ana' },
      1
    );
    expect(result.name_1).toBe('Milan Ilić');
    expect(result.name_4).toBe('Ana');
    expect(result.date).toMatch(/\d{2}\./);
  });
});

describe('fillDocument (demo template)', () => {
  const fields = addCustomFields(
    Object.entries(DEMO_CARD_SNAPSHOTS).reduce(
      (acc, [order, snap]) => ({ ...acc, ...toOrderedFields(snap, order) }),
      {}
    ),
    1
  );

  it('fills every placeholder with real values', async () => {
    const names = extractPlaceholderNames(
      await extractText(toArrayBuffer(template))
    );
    expect(names.length).toBeGreaterThan(5);
    expect(getMissingFields(names, fields)).toEqual([]);

    const blob = await fillDocument(template, fields, { highlight: 'yellow' });
    const text = await extractText(await blob.arrayBuffer());
    expect(text).toContain('Milan Ilić');
    expect(text).toContain('BG-123-AB');
    expect(text).not.toContain('{{');
    expect(text).not.toContain('undefined');
  });

  it('leaves placeholders without value untouched instead of writing "undefined"', async () => {
    const blob = await fillDocument(template, { name_1: 'Milan Ilić' });
    const text = await extractText(await blob.arrayBuffer());
    expect(text).toContain('{{name_2}}');
    expect(text).not.toContain('undefined');
  });
});
