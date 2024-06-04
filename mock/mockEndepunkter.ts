import express, { RequestHandler } from "express";

import mockFastlegerest from "./mockFastlegerest";
import mockModiacontextholder from "./mockModiacontextholder";
import mockSyfoperson from "./mockSyfoperson";
import mockIstilgangskontroll from "./mockIstilgangskontroll";

const mockEndepunkter = (server: express.Application) => {
  server.use(express.json() as RequestHandler);
  server.use(express.urlencoded() as RequestHandler);

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
