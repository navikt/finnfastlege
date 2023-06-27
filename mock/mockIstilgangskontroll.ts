import express from "express";

const tilgang = {
  harTilgang: true,
};

const harIkkeTilgang = {
  harTilgang: false,
};

const mockIstilgangskontroll = (server: express.Application) => {
  server.get(
    "/api/tilgang/navident/syfo",
    (req: express.Request, res: express.Response) => {
      res.setHeader("Content-Type", "application/json");
      // res.status(403).send(JSON.stringify(harIkkeTilgang));
      res.send(JSON.stringify(tilgang));
    }
  );
};

export default mockIstilgangskontroll;
