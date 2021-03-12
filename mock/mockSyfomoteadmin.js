const enheter = {
  enhetliste: [
    {
      enhetId: "0315",
      navn: "NAV Grünerløkka",
    },
    {
      enhetId: "0316",
      navn: "NAV Gamle Oslo",
    },
  ],
};

const veilederinfo = {
  navn: "Vetle Veileder",
  ident: "Z990000",
};

const mockSyfomoteadmin = (server) => {
  server.get("/syfomoteadmin/api/internad/veilederinfo/enheter", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(enheter));
  });

  server.get("/syfomoteadmin/api/internad/veilederinfo", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(veilederinfo));
  });
};

module.exports = mockSyfomoteadmin;
