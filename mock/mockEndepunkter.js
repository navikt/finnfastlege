const express = require("express");
const mockFastlegerest = require("./mockFastlegerest");
const mockSyfoperson = require("./mockSyfoperson");
const mockSyfotilgangskontroll = require("./mockSyfotilgangskontroll");

function mockEndepunkter(server, erLokal) {
  server.use(express.json());
  server.use(express.urlencoded());

  [mockFastlegerest, mockSyfoperson, mockSyfotilgangskontroll].forEach(
    (func) => {
      func(server, erLokal);
    }
  );
}

module.exports = mockEndepunkter;
