import { convertFieldsScript } from './scriptConversion';

const fields = {
  Place_1: 'Beograd',
  RegistrationNumberOfVehicle_3: 'BG-123-AB',
  Year: 2019,
};

it('converts to Cyrillic but keeps exempt fields and non-strings', () => {
  expect(convertFieldsScript(fields, 2)).toEqual({
    Place_1: 'Београд',
    RegistrationNumberOfVehicle_3: 'BG-123-AB',
    Year: 2019,
  });
});

it('treats "1" from the API as Latin', () => {
  expect(convertFieldsScript({ Place_1: 'Београд' }, '1')).toEqual({
    Place_1: 'Beograd',
  });
});
