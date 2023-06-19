import express from "express";

import mockFastlegerest from "./mockFastlegerest";
import mockModiacontextholder from "./mockModiacontextholder";
import mockSyfoperson from "./mockSyfoperson";
import mockIstilgangskontroll from "./mockIstilgangskontroll";

const mockEndepunkter = (server: express.Application) => {
  server.use(express.json());
  server.use(express.urlencoded());

  [
    mockFastlegerest,
    mockModiacontextholder,
    mockSyfoperson,
    mockIstilgangskontroll,
  ].forEach((func) => {
    func(server);
  });
};

export default mockEndepunkter;
