export {};

const tilgang = {
  harTilgang: true,
  begrunnelse: null,
};

const mockForLokal = (server: any) => {
  server.get(
    "/syfo-tilgangskontroll/api/tilgang/syfo",
    (req: any, res: any) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(tilgang));
    }
  );
};

const mockSyfotilgangskontroll = (server: any) => {
  mockForLokal(server);
};

module.exports = mockSyfotilgangskontroll;
