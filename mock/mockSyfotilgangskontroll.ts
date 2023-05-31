import express from "express";
import * as auth from "../server/authUtils";

const tilgang = {
  harTilgang: true,
};

const harIkkeTilgang = {
  harTilgang: false,
};

const mockSyfotilgangskontroll = (server: express.Application) => {
  server.get(
    "/syfo-tilgangskontroll/api/tilgang/navident/syfo",
    auth.ensureAuthenticated(),
    (req: express.Request, res: express.Response) => {
      res.setHeader("Content-Type", "application/json");
      // res.status(403).send(JSON.stringify(harIkkeTilgang));
      res.send(JSON.stringify(tilgang));
    }
  );
};

export default mockSyfotilgangskontroll;
