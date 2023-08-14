import express from "express";

const tilgang = {
  erGodkjent: true,
};

const harIkkeTilgang = {
  erGodkjent: false,
};

const mockIstilgangskontroll = (server: express.Application) => {
  server.get(
    "/istilgangskontroll/api/tilgang/navident/syfo",
    (req: express.Request, res: express.Response) => {
      res.setHeader("Content-Type", "application/json");
      // res.status(403).send(JSON.stringify(harIkkeTilgang));
      res.send(JSON.stringify(tilgang));
    }
  );
};

export default mockIstilgangskontroll;
