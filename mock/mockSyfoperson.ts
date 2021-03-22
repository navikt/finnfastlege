export {};

const diskresjonskode = "7";
const isEgenAnsatt = true;

const mockForLokal = (server: any) => {
  server.get(
    "/syfoperson/api/person/diskresjonskode/:fnr",
    (req: any, res: any) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(diskresjonskode));
    }
  );

  server.get("/syfoperson/api/person/egenansatt/:fnr", (req: any, res: any) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(isEgenAnsatt));
  });
};

const mockSyfoperson = (server: any) => {
  mockForLokal(server);
};

module.exports = mockSyfoperson;
