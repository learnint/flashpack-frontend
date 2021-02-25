import React from "react";
import ReactDOM from "react-dom";
import { App } from "components/core";
import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
