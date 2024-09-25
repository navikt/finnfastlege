import React from "react";
import FastlegeContainer, {
  texts,
} from "../../src/containers/FastlegeContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { testQueryClient } from "../testQueryClient";
import { describe, expect, it, beforeEach } from "vitest";
import { mockServer } from "../setup";
import { http, HttpResponse } from "msw";

let queryClient: QueryClient;

const generalError = {
  erGodkjent: false,
};

const noAccess = {
  erGodkjent: false,
};

describe("FastlegeContainerTests", () => {
  beforeEach(() => {
    queryClient = testQueryClient();
  });

  it("Manglende tilgang til finnfastlege gir melding om å kontakte identansvarlig", async () => {
    mockServer.use(
      http.get("*/istilgangskontroll/api/tilgang/navident/syfo", () =>
        HttpResponse.json(noAccess, { status: 403 })
      )
    );
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
    mockServer.use(
      http.get("*/istilgangskontroll/api/tilgang/navident/syfo", () =>
        HttpResponse.json(generalError, { status: 500 })
      )
    );
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
