const auth = require("../server/auth");

const tilgang = {
  harTilgang: true,
};

const harIkkeTilgang = {
  harTilgang: false,
};

const mockSyfotilgangskontroll = (server: any) => {
  server.get(
    "/syfo-tilgangskontroll/api/tilgang/navident/syfo",
    auth.ensureAuthenticated(),
    (req: any, res: any) => {
      res.setHeader("Content-Type", "application/json");
      // res.status(403).send(JSON.stringify(harIkkeTilgang));
      res.send(JSON.stringify(tilgang));
    }
  );
};

export default mockSyfotilgangskontroll;
