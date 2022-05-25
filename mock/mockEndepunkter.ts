import express from "express";

import mockFastlegerest from "./mockFastlegerest";
import mockModiacontextholder from "./mockModiacontextholder";
import mockSyfoperson from "./mockSyfoperson";
import mockSyfotilgangskontroll from "./mockSyfotilgangskontroll";

const mockEndepunkter = (server: express.Application) => {
  server.use(express.json());
  server.use(express.urlencoded());

  [
    mockFastlegerest,
    mockModiacontextholder,
    mockSyfoperson,
    mockSyfotilgangskontroll,
  ].forEach((func) => {
    func(server);
  });
};

export default mockEndepunkter;
