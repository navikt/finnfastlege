import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/styles.css";
import "@navikt/ds-css";
import FastlegeContainer from "./containers/FastlegeContainer";
import { minutesToMillis } from "@/utils/timeUtils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { isClientError } from "@/api/errors";
import { initFaro } from "@/faro";
import { erLokal } from "@/utils/miljoUtil";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      networkMode: "offlineFirst",
    },
    queries: {
      networkMode: "offlineFirst",
      refetchOnWindowFocus: false,
      gcTime: minutesToMillis(60),
      staleTime: minutesToMillis(30),
      retry: (failureCount, error) => {
        if (isClientError(error)) {
          return false;
        }

        return failureCount < 3;
      },
    },
  },
});

initFaro();

const container =
  document.getElementById("maincontent") || new DocumentFragment();
const root = createRoot(container);

function renderApp() {
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <FastlegeContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

async function setupMocking() {
  const { worker } = await import("./mocks/browser");
  return worker.start();
}

if (erLokal()) {
  setupMocking().then(() => renderApp());
} else {
  renderApp();
}
