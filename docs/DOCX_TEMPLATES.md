# Word templates (.docx)

A template is a normal Word document with placeholders in double curly braces.
At generation time every placeholder that has a value is replaced by that value
(underlined). Placeholders without a value stay in the document and are listed
in the preview's "N polja nije popunjeno" warning.

## Syntax

| Placeholder | Value |
|---|---|
| `{{Field_N}}` | Field `Field` from the card in slot `N` (the `order` of `needed_cards`) |
| `{{Field_pK_N}}` | The same value inflected to grammatical case `K` (1–7) via `POST /case` |
| `{{name_N}}` | `GivenName_N` + `Surname_N` |
| `{{name_pK_N}}` | Full name inflected to case `K` |
| `{{date}}` | Today, `dd. mm. yyyy.` (sr-RS) |

Rules:

- No spaces inside the braces: `{{date}}` works, `{{ date }}` does not.
- Letters, digits and `_` only.
- Formatting (font, size, bold) is taken from the template around the
  placeholder; style the placeholder the way the value should look.
- Typing a placeholder in one go is safest. If you edit it later, Word may
  split it into several runs. Detection still works, but if replacement
  fails, delete the placeholder and type it again.

## Cases (`pK`)

| K | Case | Example (Milan) |
|---|---|---|
| 1 | nominativ | Milan |
| 2 | genitiv | Milana |
| 3 | dativ | Milanu |
| 4 | akuzativ | Milana |
| 5 | vokativ | Milane |
| 6 | instrumental | Milanom |
| 7 | lokativ | Milanu |

## Script

The contract's `letter` decides the script: `1` = Latin, anything else =
Cyrillic. All text values are converted except identifiers listed in
`SCRIPT_EXEMPT_FIELDS` (`src/utils/scriptConversion.js`):
`RegistrationNumberOfVehicle`, `DocumentNumber`, `PersonalNumber`.

## Title case

These fields are written as "Title Case" (e.g. `PETROVIĆ-JOVANOVIĆ` →
`Petrović-Jovanović`): `name`, `GivenName`, `Surname`, `ParentGivenName`,
`Street`, `Place`, `PlaceOfBirth`, `CommunityOfBirth`, `StateOfBirth`,
`Community` (`FIELDS_FOR_FORMATTING` in `src/utils/formatters.js`).

## Available fields

Required fields per card type are in `src/pages/GenerateDocumentPage/cardFields.json`.
The reader may return more (e.g. `ParentGivenName`, `Community`,
`DocumentType`). Those are filled when present but are not guaranteed.

**Lična karta (`licna_karta`)**: `PersonalNumber`, `DocumentNumber`,
`GivenName`, `Surname`, `DateOfBirth`, `PlaceOfBirth`, `Street`,
`AddressNumber`, `Place`, `Sex`.

**Saobraćajna dozvola (`saobracajna_dozvola`)**:
`RegistrationNumberOfVehicle`, `VehicleCategory`, `VehicleMake`,
`CommercialDescription`, `YearOfProduction`, `EngineCapacity`,
`OwnersSurnameOrBusinessName`, `OwnerName`, `OwnerAddress`.

## Testing a template

1. `npm run template:check -- path/to/template.docx` lists every placeholder,
   marks invalid ones and fields no card type guarantees. Exit code 1 means
   there are warnings.
2. To try it end to end, put the file in `public/assets/demo/`, point a
   `DEMO_DOCUMENTS` entry (`src/pages/DemoPage/demoData.js`) at it, open `/demo`,
   load the cards and preview. The preview highlights every filled value in
   yellow. Anything still in `{{…}}` is listed as missing.

`scripts/generateDemoTemplate.js` shows how the demo template is built in code.
