const { Document, Packer, Paragraph, TextRun } = require('docx');
const fs = require('fs');
const path = require('path');

const templateParagraph = (label, placeholder) =>
  new Paragraph({
    children: [
      new TextRun({ text: `${label}: `, bold: true }),
      new TextRun({ text: `{{${placeholder}}}` }),
    ],
  });
const templateAddressParagraph = (label, order) =>
  new Paragraph({
    children: [
      new TextRun({ text: `${label}: `, bold: true }),
      new TextRun({ text: `{{Street_${order}}} ` }),
      new TextRun({ text: `{{AddressNumber_${order}}}, ` }),
      new TextRun({ text: `{{Place_${order}}}` }),
    ],
  });

const document = new Document({
  sections: [
    {
      children: [
        new Paragraph({
          text: 'Demo kupoprodajni ugovor vozila',
          heading: 'Heading1',
        }),
        new Paragraph({
          text: 'Ovaj dokument je generisan iz mock podataka u aplikaciji Dokko.',
        }),
        new Paragraph(''),
        templateParagraph('Prodavac', 'name_1'),
        templateParagraph('JMBG prodavca', 'PersonalNumber_1'),
        templateAddressParagraph('Adresa prodavca', 1),
        new Paragraph(''),
        templateParagraph('Kupac', 'name_2'),
        templateParagraph('JMBG kupca', 'PersonalNumber_2'),
        templateAddressParagraph('Adresa kupca', 2),
        new Paragraph(''),
        templateParagraph('Broj registracije', 'RegistrationNumberOfVehicle_3'),
        templateParagraph('Marka vozila', 'VehicleMake_3'),
        templateParagraph('Model vozila', 'CommercialDescription_3'),
        templateParagraph('Godina proizvodnje', 'YearOfProduction_3'),
        new Paragraph(''),
        templateParagraph('Datum potpisivanja', 'date'),
        new Paragraph({
          text: 'Potpis prodavca: ____________________',
        }),
        new Paragraph({
          text: 'Potpis kupca: ____________________',
        }),
      ],
    },
  ],
});

(async () => {
  const buffer = await Packer.toBuffer(document);
  const outputPath = path.resolve(
    __dirname,
    '../public/assets/demo/demo-contract.docx'
  );
  fs.writeFileSync(outputPath, buffer);
  console.log('Demo template generated at:', outputPath);
})();
