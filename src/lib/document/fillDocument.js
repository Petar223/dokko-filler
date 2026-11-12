import { PatchType, TextRun, patchDocument } from 'docx';
import { formatField, getCurrentDate } from './formatters';
import { hasValue } from './placeholders';
import { convertFieldsScript } from './scriptConversion';

export const DOCX_MIME =
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

// Card fields (`GivenName_1`, ...) + derived fields (`name_N`, `date`).
export const addCustomFields = (fields, letter) => {
  const converted = convertFieldsScript(fields, letter);
  const derived = { date: getCurrentDate() };

  Object.keys(converted)
    .map((key) => key.match(/^GivenName_(\d+)$/)?.[1])
    .filter(Boolean)
    .forEach((order) => {
      derived[`name_${order}`] = [
        converted[`GivenName_${order}`],
        converted[`Surname_${order}`],
      ]
        .filter(hasValue)
        .join(' ');
    });

  return { ...converted, ...derived };
};

// Only fields with a value are patched; unknown placeholders stay visible in
// the document and are reported as missing by the caller.
export const fillDocument = async (
  templateBytes,
  fields,
  { highlight } = {}
) => {
  const patches = Object.fromEntries(
    Object.entries(fields)
      .filter(([, value]) => hasValue(value))
      .map(([key, value]) => [
        key,
        {
          type: PatchType.PARAGRAPH,
          children: [
            new TextRun({
              text: formatField(key, value),
              underline: { type: 'single' },
              ...(highlight && { highlight }),
            }),
          ],
        },
      ])
  );

  const bytes = await patchDocument(templateBytes, {
    patches,
    keepOriginalStyles: true,
  });
  return new Blob([bytes], { type: DOCX_MIME });
};
