import { ThemeTypings, useColorModeValue } from "@chakra-ui/react";

export const useColorScheme = (
  colorScheme: ThemeTypings["colorSchemes"] | (string & {}) = "purple",
  inverted = false
) => {
  const lightValue = !inverted ? `${colorScheme}.600` : `${colorScheme}.200`;
  const darkValue = !inverted ? `${colorScheme}.200` : `${colorScheme}.600`;

  return useColorModeValue(lightValue, darkValue);
};
