import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const client = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <ReactQueryDevtools initialIsOpen={false} />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
