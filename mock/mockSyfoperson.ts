import express from "express";

const NAV_PERSONIDENT_HEADER = "nav-personident";

const diskresjonskode = "7";
const isEgenAnsatt = true;

const mockSyfoperson = (server: express.Application) => {
  server.get(
    "/syfoperson/api/v2/person/diskresjonskode",
    (req: express.Request, res: express.Response) => {
      if (
        req.headers[NAV_PERSONIDENT_HEADER] &&
        req.headers[NAV_PERSONIDENT_HEADER].length === 11
      ) {
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(diskresjonskode));
      } else {
        res.status(400).send("Did not find PersonIdent in headers");
      }
    }
  );

  server.get(
    "/syfoperson/api/v2/person/egenansatt",
    (req: express.Request, res: express.Response) => {
      if (
        req.headers[NAV_PERSONIDENT_HEADER] &&
        req.headers[NAV_PERSONIDENT_HEADER].length === 11
      ) {
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(isEgenAnsatt));
      } else {
        res.status(400).send("Did not find PersonIdent in headers");
      }
    }
  );
};

export default mockSyfoperson;
