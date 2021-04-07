export {};

const tilgang = {
  harTilgang: true,
  begrunnelse: null,
};

const mockSyfotilgangskontroll = (server: any) => {
  server.get(
    "/syfo-tilgangskontroll/api/tilgang/syfo",
    (req: any, res: any) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(tilgang));
    }
  );
};

export default mockSyfotilgangskontroll;
