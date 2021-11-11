import { ensureAuthenticated } from "../server/auth";

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
};

const mockFastlegerest = (server: any) => {
  server.get(
    "/fastlegerest/api/v2/fastlege",
    ensureAuthenticated(),
    (req: any, res: any) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(fastlege));
    }
  );
};

export default mockFastlegerest;
