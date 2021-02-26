import { ThemeTypings, useColorModeValue } from "@chakra-ui/react";

export const useColorScheme = (
  colorScheme: ThemeTypings["colorSchemes"] | (string & {}) = "purple"
) => {
  return useColorModeValue(`${colorScheme}.600`, `${colorScheme}.200`);
};
