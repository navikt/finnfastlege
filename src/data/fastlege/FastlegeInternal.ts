export interface Pasientforhold {
  fom: Date;
  tom: Date;
}

export interface Adresse {
  adresse?: string;
  postnummer?: string;
  poststed?: string;
}

export interface Fastlegekontor {
  navn?: string;
  besoeksadresse?: Adresse;
  postadresse?: Adresse;
  telefon?: string;
  epost?: string;
  orgnummer?: string;
}

export interface Pasient {
  fornavn?: string;
  mellomnavn?: string;
  etternavn?: string;
  fnr?: string;
}

export interface FastlegeInternal {
  fornavn?: string;
  mellomnavn?: string;
  etternavn?: string;
  fnr?: string;
  herId?: number;
  helsepersonellregisterId?: number;
  pasient?: Pasient;
  fastlegekontor?: Fastlegekontor;
  pasientforhold: Pasientforhold;
}
