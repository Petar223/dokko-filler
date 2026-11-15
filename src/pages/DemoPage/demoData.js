// `name` values are translation keys (see src/locales).
export const DEMO_DOCUMENTS = [
  {
    id: 'demo-vehicle-sale',
    name: 'demo.docName',
    summary:
      'Prikaz procesa pripreme ugovora sa unapred popunjenim demo podacima.',
    templateURL: '/assets/demo/demo-contract.docx',
    letter: 1,
    neededCards: [
      {
        order: 1,
        type: 'licna_karta',
        name: 'demo.seller',
      },
      {
        order: 2,
        type: 'licna_karta',
        name: 'demo.buyer',
      },
      {
        order: 3,
        type: 'saobracajna_dozvola',
        name: 'demo.vehicle',
      },
    ],
  },
];

export const DEMO_CARD_SNAPSHOTS = {
  1: {
    DocumentType: 'Lična karta',
    DocumentNumber: 'RS012345',
    GivenName: 'Milan',
    Surname: 'Ilić',
    PersonalNumber: '1203985470032',
    DateOfBirth: '12.03.1985.',
    PlaceOfBirth: 'Beograd',
    ParentGivenName: 'Jovan',
    Sex: 'M',
    Street: 'Balkanska',
    AddressNumber: '14',
    Place: 'Beograd',
    Community: 'Savski venac',
  },
  2: {
    DocumentType: 'Lična karta',
    DocumentNumber: 'RS067890',
    GivenName: 'Ana',
    Surname: 'Petrović',
    PersonalNumber: '0510996720011',
    DateOfBirth: '05.10.1996.',
    PlaceOfBirth: 'Novi Sad',
    ParentGivenName: 'Mirjana',
    Sex: 'F',
    Street: 'Bulevar oslobođenja',
    AddressNumber: '72',
    Place: 'Novi Sad',
    Community: 'Novi Sad',
  },
  3: {
    RegistrationNumberOfVehicle: 'BG-123-AB',
    VehicleCategory: 'Putničko vozilo',
    VehicleMake: 'Škoda',
    CommercialDescription: 'Octavia 2.0 TDI',
    YearOfProduction: '2019',
    EngineCapacity: '1968 ccm',
    OwnersSurnameOrBusinessName: 'Ilić',
    OwnerName: 'Milan',
    OwnerAddress: 'Balkanska 14, Beograd',
  },
};

export const mockReadCard = (order) =>
  new Promise((resolve, reject) => {
    const snapshot = DEMO_CARD_SNAPSHOTS[order];
    setTimeout(() => {
      if (!snapshot) {
        reject(new Error('Demo podaci za izabrani dokument nisu dostupni.'));
        return;
      }

      resolve(snapshot);
    }, 600);
  });
