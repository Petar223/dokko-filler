---
name: docx-template
description: Create, review or debug a Word (.docx) contract template for Dokko Filler - placeholder syntax ({{Field_N}}, {{Field_pK_N}}, {{name_N}}, {{date}}), grammatical cases, Latin/Cyrillic, and checking with npm run template:check. Use when a template is added, a field is not filled, or a placeholder shows up in the output.
---

# Word templates

Full reference: `docs/DOCX_TEMPLATES.md`.

## Checklist for a new or changed template

1. Run `npm run template:check -- <file.docx>`.
   - `INVALID` → spaces or illegal characters inside `{{ }}`, or a missing
     `_N` suffix.
   - `unknown field` → not a required field of any card type. It is fine only
     if the reader really returns it (check with `/read` or the demo snapshot).
   - Unbalanced braces → a `{{` or `}}` was mistyped.
2. Every `N` used must match an `order` in the contract's `needed_cards`.
3. Cases: `{{GivenName_p3_1}}` = dative of seller's first name. `K` is 1–7.
   `name_pK_N` inflects the full name.
4. Script: values follow the contract's `letter` (1 = Latin). Registration
   numbers, document numbers and JMBG are never converted.
5. Style the placeholder the way the value should look. The inserted text keeps
   the surrounding formatting and is underlined.

## Debugging "a field is not filled"

- Placeholder visible in output, listed as missing in the preview:
  - Value missing → the card did not return that field (the card shows
    "Nedostaju polja").
  - Name mismatch → compare with `cardFields.json` / the reader response
    (case-sensitive).
- Placeholder visible but **not** listed as missing → Word split it into
  runs with different formatting, so `patchDocument` cannot match it. Retype
  the placeholder in one go, without formatting changes inside it.
- `undefined` never appears: empty values are skipped on purpose.

## Trying it end to end

Copy the file into `public/assets/demo/`, point `templateURL` of a
`DEMO_DOCUMENTS` entry (`src/pages/DemoPage/demoData.js`) at it, open `/demo`,
load all cards, then "Pregledaj dokument". Filled values are highlighted in
yellow. Turn "Označi popunjena polja" off to see the final look.

To build a template in code, follow `scripts/generateDemoTemplate.js`.
