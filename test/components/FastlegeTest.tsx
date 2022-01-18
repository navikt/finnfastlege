import React from "react";

import { expect } from "chai";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { apiMock } from "../stubs/stubApi";
import { FASTLEGEREST_ROOT } from "@/api/constants";
import { Fastlege, texts } from "@/components/Fastlege";
import nock from "nock";

const fnr = "01117302624";

let queryClient: QueryClient;
let apiMockScope: nock.Scope;

describe("FastlegeTests", () => {
  beforeEach(() => {
    apiMockScope = apiMock();
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
  });
  afterEach(() => {
    nock.cleanAll();
  });

  it("Feil i kall mot fastlegerest gir generell feilmelding", async () => {
    apiMockScope.get(`${FASTLEGEREST_ROOT}/fastlege/fastleger`).reply(500);
    render(
      <QueryClientProvider client={queryClient}>
        <Fastlege fnr={fnr} />
      </QueryClientProvider>
    );

    expect(
      await screen.findByRole("heading", {
        name: texts.generalErrorTitle,
      })
    ).to.exist;
    expect(await screen.findByText(texts.generalErrorMessage)).to.exist;
  });

  it("Manglende tilgang gir ingen tilgang-feilmelding", async () => {
    apiMockScope.get(`${FASTLEGEREST_ROOT}/fastlege/fastleger`).reply(403);
    render(
      <QueryClientProvider client={queryClient}>
        <Fastlege fnr={fnr} />
      </QueryClientProvider>
    );

    expect(
      await screen.findByRole("heading", {
        name: texts.noAccessTitle,
      })
    ).to.exist;
    expect(await screen.findByText(texts.noAccessFallback)).to.exist;
  });

  it("Fant ikke fastlege gir ikke funnet-feilmelding", async () => {
    apiMockScope.get(`${FASTLEGEREST_ROOT}/fastlege/fastleger`).reply(404);
    render(
      <QueryClientProvider client={queryClient}>
        <Fastlege fnr={fnr} />
      </QueryClientProvider>
    );

    expect(
      await screen.findByRole("heading", {
        name: texts.fastlegeNotFoundTitle,
      })
    ).to.exist;
    expect(await screen.findByText(texts.fastlegeNotFoundMessage)).to.exist;
  });
});
