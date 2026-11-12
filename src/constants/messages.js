// All user-facing Serbian (Latin) copy that is shared or used for errors.
export const MSG = {
  http: {
    400: 'Neispravan zahtev. Proverite unete podatke.',
    401: 'Sesija je istekla. Prijavite se ponovo.',
    403: 'Nemate dozvolu za ovu akciju.',
    404: 'Traženi resurs nije pronađen.',
    500: 'Greška na serveru. Pokušajte ponovo kasnije.',
    502: 'Server trenutno nije dostupan (502).',
    503: 'Servis je privremeno nedostupan.',
    504: 'Server nije odgovorio na vreme.',
    unknown: (status) => `Neočekivana greška (status ${status}).`,
    noResponse: 'Server ne odgovara. Proverite internet konekciju.',
    setup: 'Greška pri slanju zahteva.',
  },
  reader: {
    offline:
      'Čitač kartica nije dostupan. Proverite da li je program za čitač pokrenut.',
    readFailed:
      'Neuspešno čitanje kartice. Ubacite karticu u čitač i pokušajte ponovo.',
    wrongType: (expected) =>
      `Učitani dokument ne odgovara traženom tipu (${expected}).`,
    loaded: (name) => `${name}: podaci su učitani.`,
  },
  auth: {
    loginSuccess: 'Uspešno ste se prijavili!',
    loginFailed: 'Pogrešan email ili lozinka.',
    logoutSuccess: 'Uspešno ste se odjavili.',
    logoutFailed: 'Greška pri odjavi. Pokušajte ponovo.',
    signupSuccess: 'Poslali smo vam kod za potvrdu na email.',
    signupFailed: 'Registracija nije uspela. Pokušajte ponovo.',
    confirmSuccess: 'Nalog je potvrđen. Možete se prijaviti.',
    confirmFailed: 'Kod nije ispravan ili je istekao.',
    codeResent: 'Novi kod je poslat na email.',
    needsConfirmation: 'Nalog još nije potvrđen. Unesite kod iz emaila.',
    unsupportedStep:
      'Prijava zahteva dodatni korak koji aplikacija još ne podržava.',
    emailRequired: 'Email je obavezan.',
    emailInvalid: 'Email nije validan.',
    passwordRequired: 'Lozinka je obavezna.',
    confirmPasswordRequired: 'Potvrda lozinke je obavezna.',
    passwordsMismatch: 'Lozinke se ne podudaraju.',
    codeRequired: 'Kod je obavezan.',
  },
  documents: {
    listFailed: 'Neuspešno učitavanje liste ugovora.',
    listEmpty: 'Lista ugovora je prazna.',
    documentFailed: 'Neuspešno učitavanje ugovora.',
    templateFailed:
      'Šablon ugovora nije dostupan (link je možda istekao). Pokušajte ponovo.',
    generateFailed: 'Greška prilikom pripreme dokumenta. Pokušajte ponovo.',
  },
  generic: 'Došlo je do greške.',
};
