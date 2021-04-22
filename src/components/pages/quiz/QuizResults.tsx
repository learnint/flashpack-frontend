import React from "react";
import {
  CircularProgress,
  CircularProgressLabel,
  VStack,
  Text,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useLocationState } from "router";
import { useColorScheme } from "theme";

interface QuizResultsProps {
  correct: number;
  total: number;
}

export const QuizResults: React.FC<QuizResultsProps> = ({ correct, total }) => {
  const history = useHistory();
  const { from } = useLocationState();
  const colorScheme = useColorScheme();

  const percentage = Math.round((correct / total) * 1000) / 10;

  return (
    <VStack w="full" maxW="container.sm">
      <CircularProgress
        value={percentage}
        color={colorScheme}
        trackColor={useColorModeValue("blackAlpha.200", "whiteAlpha.200")}
        size="300px"
      >
        <CircularProgressLabel>{percentage}%</CircularProgressLabel>
      </CircularProgress>
      <Text fontSize="xl">
        You answered {correct} out of {total} cards correctly.
      </Text>
      <Button w="300px" onClick={() => history.replace(from)}>
        Exit Quiz
      </Button>
    </VStack>
  );
};
