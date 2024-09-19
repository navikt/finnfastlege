import { http, HttpResponse } from "msw";

const saksbehandler = {
  ident: "Z999999",
  navn: "Vetle Veileder",
  fornavn: "Vetle",
  etternavn: "Veileder",
  enheter: [
    {
      enhetId: "0315",
      navn: "NAV Grünerløkka",
    },
    {
      enhetId: "0316",
      navn: "NAV Gamle Oslo",
    },
  ],
};

const aktivBruker = {
  aktivBruker: null,
  aktivEnhet: null,
};

const aktivEnhet = {
  aktivBruker: null,
  aktivEnhet: "0315",
};

const mockModiacontextholder = [
  http.get("/modiacontextholder/api/decorator", () => {
    return HttpResponse.json(saksbehandler);
  }),

  http.get(
    "/modiacontextholder/api/context/aktivbruker",
    () => {
      return HttpResponse.json(aktivBruker);
    }
  ),

  http.get(
    "/modiacontextholder/api/context/aktivenhet",
    () => {
      return HttpResponse.json(aktivEnhet);
    }
  ),

  http.post(
    "/modiacontextholder/api/context",
    () => {
      return new HttpResponse(null, { status: 204 });
    }
  ),
];

export default mockModiacontextholder;
