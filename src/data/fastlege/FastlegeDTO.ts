export interface PeriodeDTO {
  fom: Date;
  tom: Date;
}

export interface RelasjonDTO {
  kodeVerdi: string;
  kodeTekst: string;
}

export interface AdresseDTO {
  adresse?: string;
  postnummer?: string;
  poststed?: string;
}

export interface FastlegekontorDTO {
  navn?: string;
  besoeksadresse?: AdresseDTO;
  postadresse?: AdresseDTO;
  telefon?: string;
  epost?: string;
  orgnummer?: string;
}

export interface PasientDTO {
  fornavn?: string;
  mellomnavn?: string;
  etternavn?: string;
  fnr?: string;
}

export interface FastlegeDTO {
  fornavn?: string;
  mellomnavn?: string;
  etternavn?: string;
  fnr?: string;
  herId?: number;
  helsepersonellregisterId?: number;
  pasient?: PasientDTO;
  fastlegekontor?: FastlegekontorDTO;
  pasientforhold: PeriodeDTO;
  gyldighet: PeriodeDTO;
  relasjon: RelasjonDTO;
}
