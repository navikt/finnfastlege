export interface Periode {
  fom: Date;
  tom: Date;
}

export enum RelasjonKodeVerdi {
  FASTLEGE = "LPFL",
  VIKAR = "LPVI",
}

export interface Relasjon {
  kodeVerdi: string;
  kodeTekst: string;
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
  pasientforhold: Periode;
  gyldighet: Periode;
  relasjon: Relasjon;
  stillingsprosent?: number;
}
