import React from "react";
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode();

  return (
    <IconButton
      fontSize="lg"
      variant="ghost"
      onClick={toggleColorMode}
      icon={useColorModeValue(<FaMoon />, <FaSun />)}
      aria-label={`Switch to ${useColorModeValue("dark", "light")} mode`}
      {...props}
    />
  );
};
