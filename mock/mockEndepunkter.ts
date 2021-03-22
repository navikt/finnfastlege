export {};

const express = require("express");
const mockFastlegerest = require("./mockFastlegerest");
const mockModiacontextholder = require("./mockModiacontextholder");
const mockSyfoperson = require("./mockSyfoperson");
const mockSyfotilgangskontroll = require("./mockSyfotilgangskontroll");

const mockEndepunkter = (server: any, erLokal: boolean) => {
  server.use(express.json());
  server.use(express.urlencoded());

  [
    mockFastlegerest,
    mockModiacontextholder,
    mockSyfoperson,
    mockSyfotilgangskontroll,
  ].forEach((func) => {
    func(server, erLokal);
  });
};

module.exports = mockEndepunkter;
