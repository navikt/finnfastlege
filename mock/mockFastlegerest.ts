import { ensureAuthenticated } from "../server/auth";
import { RelasjonKodeVerdi } from "../src/data/fastlege/FastlegeInternal";
import { leggTilDagerPaDato } from "./util/dateUtil";

const fastlege = {
  fornavn: "Lege",
  mellomnavn: null,
  etternavn: "Legesen",
  fnr: "12035507971",
  herId: 711,
  helsepersonellregisterId: 2127598,
  pasient: {
    fornavn: "Pasient",
    mellomnavn: null,
    etternavn: "Arbeidstaker",
    fnr: "01117302624",
  },
  fastlegekontor: {
    navn: "BYÅSEN LEGESENTER AS",
    besoeksadresse: {
      adresse: "Fjellseterveien 1",
      postnummer: "7020",
      poststed: "Trondheim",
    },
    postadresse: {
      adresse: "",
      postnummer: "7020",
      poststed: "Trondheim",
    },
    telefon: "73806770",
    epost: "byasen@edi.nhn.no",
    orgnummer: "930161012",
  },
  pasientforhold: {
    fom: "1993-03-01",
    tom: "9999-12-31",
  },
  gyldighet: {
    fom: "1993-03-01",
    tom: "9999-12-31",
  },
  relasjon: {
    kodeVerdi: RelasjonKodeVerdi.FASTLEGE,
    kodeTekst: "Fastlege",
  },
};

const fastlegeList = [
  fastlege,
  {
    ...fastlege,
    fornavn: "Vikarlege",
    mellomnavn: null,
    etternavn: "Vikarsen",
    fnr: "12045507971",
    herId: 711,
    helsepersonellregisterId: fastlege.helsepersonellregisterId + 1,
    gyldighet: {
      fom: leggTilDagerPaDato(new Date(), -300),
      tom: leggTilDagerPaDato(new Date(), 300),
    },
    relasjon: {
      kodeVerdi: RelasjonKodeVerdi.VIKAR,
      kodeTekst: "Vikar",
    },
    stillingsprosent: 60,
  },
  {
    ...fastlege,
    fornavn: "Legensvikar",
    mellomnavn: null,
    etternavn: "Vikarheim",
    fnr: "12055507971",
    herId: 711,
    helsepersonellregisterId: fastlege.helsepersonellregisterId + 2,
    gyldighet: {
      fom: leggTilDagerPaDato(new Date(), -100),
      tom: leggTilDagerPaDato(new Date(), 400),
    },
    relasjon: {
      kodeVerdi: RelasjonKodeVerdi.VIKAR,
      kodeTekst: "Vikar",
    },
    stillingsprosent: null,
  },
];

const mockFastlegerest = (server: any) => {
  server.get(
    "/fastlegerest/api/v2/fastlege/fastleger",
    ensureAuthenticated(),
    (req: any, res: any) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(fastlegeList));
    }
  );
};

export default mockFastlegerest;
