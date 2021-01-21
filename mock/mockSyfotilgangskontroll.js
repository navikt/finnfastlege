const tilgang = {
  harTilgang: true,
  begrunnelse: null,
};

function mockForLokal(server) {
  server.get("/syfo-tilgangskontroll/api/tilgang/syfo", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(tilgang));
  });
}

function mockSyfotilgangskontroll(server) {
  mockForLokal(server);
}

module.exports = mockSyfotilgangskontroll;
