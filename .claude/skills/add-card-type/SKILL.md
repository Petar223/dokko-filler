---
name: add-card-type
description: Support a new document/card type read from the card reader in Dokko Filler (e.g. passport, driving licence) - required fields, labels, type detection, card rendering, formatting rules, demo snapshot and tests. Use when a contract needs a card type that is not licna_karta or saobracajna_dozvola.
---

# Add a card type

Card types are identified by the `type` string the backend sends in
`needed_cards` (e.g. `licna_karta`). Agree on the string with the backend first.

1. **Required fields**: add `"<type>": [ ... ]` to
   `src/features/generate/cardFields.json`. Use the exact keys the reader
   returns. `scripts/checkTemplate.js` reads this file too.
2. **`src/features/generate/cardTypes.js`**
   - `CARD_TYPE.<NAME> = '<type>'`
   - `CARD_TYPES[<type>] = { label, detectBy, requiredFields }`. `detectBy`
     must be a field that only this card returns (it is how a wrong card in
     the reader gets rejected).
   - Labels for new fields in `FIELD_LABELS` (Serbian).
3. **Rendering**: add a `ROWS[<type>]` entry in `LoadedCard.jsx` (what to show,
   in which order) and an icon in `cardIcon()`. Add a placeholder icon in
   `CardSlot.jsx`.
4. **Formatting**:
   - Names/places that should be "Title Case" → `FIELDS_FOR_FORMATTING` in
     `src/lib/document/formatters.js`.
   - Identifiers that must not be converted to Cyrillic → `SCRIPT_EXEMPT_FIELDS`
     in `src/lib/document/scriptConversion.js`.
5. **Demo**: add a snapshot to `DEMO_CARD_SNAPSHOTS` and, if useful, a demo
   document using it in `src/features/demo/demoData.js`.
6. **Docs**: list the fields in `docs/DOCX_TEMPLATES.md` ("Available fields").
7. **Tests**:
   - `useCardSlots.test.jsx`: the new type is accepted in its slot and rejected
     in another type's slot.
   - `CardSlot.test.jsx`: it renders and warns about missing fields.
8. Run `verify-change`, then try the flow on `/demo`.
