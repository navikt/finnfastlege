import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom";
import "./styles/styles.less";
import FastlegeContainer from "./containers/FastlegeContainer";
import { minutesToMillis } from "@/utils/timeUtils";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: minutesToMillis(60),
      staleTime: minutesToMillis(30),
    },
  },
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <FastlegeContainer />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  document.getElementById("maincontent")
);
