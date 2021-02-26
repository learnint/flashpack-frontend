import { extendTheme } from "@chakra-ui/react";
import { Components } from "./components";

export const theme = extendTheme({
  components: Components,
});

export * from "./useColorScheme";
