import React from "react";
import ReactDOM from "react-dom/client";
import ThemeProvider from "~components/ThemeProvider/ThemeProvider";
import ErrorBoundary from "~components/ErrorBoundary/ErrorBoundary";
import GlobalStyle from "../utils/GlobalSyile";
import Root from "~components/Root/Root";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ErrorBoundary>
        <GlobalStyle />
        <Root />
      </ErrorBoundary>
    </ThemeProvider>
  </React.StrictMode>,
);
