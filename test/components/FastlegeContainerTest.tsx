import React from "react";
import FastlegeContainer, {
  texts,
} from "../../src/containers/FastlegeContainer";
import { apiMock } from "../stubs/stubApi";
import nock from "nock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { testQueryClient } from "../testQueryClient";
import { describe, expect, it, beforeEach, afterEach } from "vitest";

let queryClient: QueryClient;
let apiMockScope: nock.Scope;

const generalError = {
  erGodkjent: false,
};

const noAccess = {
  erGodkjent: false,
};

describe("FastlegeContainerTests", () => {
  beforeEach(() => {
    queryClient = testQueryClient();
    apiMockScope = apiMock();
  });
  afterEach(() => {
    nock.cleanAll();
  });

  it("Manglende tilgang til finnfastlege gir melding om å kontakte identansvarlig", async () => {
    apiMockScope
      .get(`/istilgangskontroll/api/tilgang/navident/syfo`)
      .reply(403, () => noAccess);
    render(
      <QueryClientProvider client={queryClient}>
        <FastlegeContainer />
      </QueryClientProvider>
    );

    const title = await screen.findByRole("heading", {
      name: texts.noAccessTitle,
    });
    const message = await screen.findByText(texts.noAccessMessage);
    expect(title).to.exist;
    expect(message).to.exist;
  });

  it("Feil i kall mot tilgangstjenesten gir generell feilmelding", async () => {
    apiMockScope
      .get(`/istilgangskontroll/api/tilgang/navident/syfo`)
      .reply(500, () => generalError);
    render(
      <QueryClientProvider client={queryClient}>
        <FastlegeContainer />
      </QueryClientProvider>
    );

    const title = await screen.findByRole("heading", {
      name: texts.generalErrorTitle,
    });
    const message = await screen.findByText(texts.generalErrorMessage);
    expect(title).to.exist;
    expect(message).to.exist;
  });
});
