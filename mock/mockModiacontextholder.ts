import { ensureAuthenticated } from "../server/auth";

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

const mockModiacontextholder = (server: any) => {
  server.get("/modiacontextholder/api/decorator", (req: any, res: any) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(saksbehandler));
  });

  server.get(
    "/modiacontextholder/api/context/aktivbruker",
    ensureAuthenticated(),
    (req: any, res: any) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(aktivBruker));
    }
  );

  server.get(
    "/modiacontextholder/api/context/aktivenhet",
    ensureAuthenticated(),
    (req: any, res: any) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(aktivEnhet));
    }
  );

  server.post(
    "/modiacontextholder/api/context",
    ensureAuthenticated(),
    (req: any, res: any) => {
      res.send().status(204);
    }
  );
};

export default mockModiacontextholder;
