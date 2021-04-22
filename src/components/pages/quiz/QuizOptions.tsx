import React from "react";
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Card, CardType, State } from "models";

interface QuizOptionsProps {
  card: Card;
  answerInputState: State<string | string[] | undefined>;
  isAnswerShown: boolean;
}

export const QuizOptions: React.FC<QuizOptionsProps> = ({
  card: { type, options },
  answerInputState,
  isAnswerShown,
}) => {
  const [answerInput, setAnswerInput] = answerInputState;

  switch (type) {
    case CardType.TF:
    case CardType.MC:
      return (
        <RadioGroup onChange={setAnswerInput} value={answerInput as string}>
          <Stack>
            {options.map((option) => (
              <Box
                key={option.id}
                bgColor={
                  isAnswerShown
                    ? option.isCorrect
                      ? "green.400"
                      : undefined
                    : undefined
                }
                borderWidth="thin"
                rounded="lg"
              >
                <Radio
                  w="full"
                  p="5"
                  value={option.id}
                  isDisabled={isAnswerShown}
                >
                  {option.text}
                </Radio>
              </Box>
            ))}
          </Stack>
        </RadioGroup>
      );
    case CardType.CHK:
      return (
        <CheckboxGroup
          onChange={setAnswerInput as any}
          value={(answerInput as string[]) || []}
        >
          <Stack>
            {options.map((option) => (
              <Box
                key={option.id}
                bgColor={
                  isAnswerShown
                    ? option.isCorrect
                      ? "green.400"
                      : undefined
                    : undefined
                }
                borderWidth="thin"
                rounded="lg"
              >
                <Checkbox
                  w="full"
                  p="5"
                  value={option.id}
                  isDisabled={isAnswerShown}
                >
                  {option.text}
                </Checkbox>
              </Box>
            ))}
          </Stack>
        </CheckboxGroup>
      );
    case CardType.BLANK:
      return (
        <Textarea
          value={answerInput}
          onChange={(e) => setAnswerInput(e.currentTarget.value)}
          placeholder="Answer"
          isDisabled={isAnswerShown}
        />
      );
  }
};
