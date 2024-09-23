import React from "react";

import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Fastlege, texts } from "@/components/Fastlege";
import { testQueryClient } from "../testQueryClient";
import { describe, expect, it, beforeEach } from "vitest";
import { mockServer } from "../setup";
import { http, HttpResponse } from "msw";

const fnr = "01117302624";

let queryClient: QueryClient;

describe("FastlegeTests", () => {
  beforeEach(() => {
    queryClient = testQueryClient();
  });

  it("Feil i kall mot fastlegerest gir generell feilmelding", async () => {
    mockServer.use(
      http.get("*/fastlege/fastleger", () =>
        HttpResponse.text("error", { status: 500 })
      )
    );

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
    mockServer.use(
      http.get("*/fastlege/fastleger", () =>
        HttpResponse.text("no access", { status: 403 })
      )
    );

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
    mockServer.use(
      http.get("*/fastlege/fastleger", () => HttpResponse.json([]))
    );

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
