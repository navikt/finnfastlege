import React from "react";
import { createRoot } from "react-dom/client";
import "@navikt/ds-css";
import "./index.css";
import FastlegeContainer from "./containers/FastlegeContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { isClientError } from "./api/errors";
import { minutesToMillis } from "./utils/timeUtils";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      networkMode: "offlineFirst",
    },
    queries: {
      networkMode: "offlineFirst",
      refetchOnWindowFocus: false,
      cacheTime: minutesToMillis(60),
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

const container = document.getElementById("root") || new DocumentFragment();
const root = createRoot(container);

root.render(
  <QueryClientProvider client={queryClient}>
    <FastlegeContainer />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
