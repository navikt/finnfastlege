const diskresjonskode = "7";
const isEgenAnsatt = true;

function mockForLokal(server) {
  server.get("/syfoperson/api/person/diskresjonskode/:fnr", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(diskresjonskode));
  });

  server.get("/syfoperson/api/person/egenansatt/:fnr", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(isEgenAnsatt));
  });
}

function mockSyfoperson(server) {
  mockForLokal(server);
}

module.exports = mockSyfoperson;
