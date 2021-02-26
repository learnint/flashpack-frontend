import React from "react";
import ReactDOM from "react-dom";
import { App } from "components/core";
import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import { AuthProvider } from "auth";

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
