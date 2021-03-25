export {};

const NAV_PERSONIDENT_HEADER = "nav-personident";

const diskresjonskode = "7";
const isEgenAnsatt = true;

const mockForLokal = (server: any) => {
  server.get("/syfoperson/api/person/diskresjonskode", (req: any, res: any) => {
    if (
      req.headers[NAV_PERSONIDENT_HEADER] &&
      req.headers[NAV_PERSONIDENT_HEADER].length === 11
    ) {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(diskresjonskode));
    } else {
      res.status(400).send("Did not find PersonIdent in headers");
    }
  });

  server.get("/syfoperson/api/person/egenansatt", (req: any, res: any) => {
    if (
      req.headers[NAV_PERSONIDENT_HEADER] &&
      req.headers[NAV_PERSONIDENT_HEADER].length === 11
    ) {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(isEgenAnsatt));
    } else {
      res.status(400).send("Did not find PersonIdent in headers");
    }
  });
};

const mockSyfoperson = (server: any) => {
  mockForLokal(server);
};

module.exports = mockSyfoperson;
