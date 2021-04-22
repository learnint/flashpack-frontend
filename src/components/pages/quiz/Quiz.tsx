import React, { useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQueryPack } from "api";
import { CardType, SetState } from "models";
import { useToast } from "components/common";
import { useColorScheme } from "theme";
import { QuizCard } from "./QuizCard";
import { QuizOptions } from "./QuizOptions";
import { QuizResults } from "./QuizResults";

interface QuizProps {
  setProgress: SetState<number>;
}

export const Quiz: React.FC<QuizProps> = ({ setProgress }) => {
  const { packId } = useParams<{ packId: string }>();
  const colorScheme = useColorScheme();
  const { toast, closeAll } = useToast();

  const { data: pack, isLoading, isError } = useQueryPack(packId);

  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isAnswerShown, setIsAnswerShown] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [answerInput, setAnswerInput] = useState<string | string[]>();
  const [correctAmount, setCorrectAmount] = useState<number>(0);

  if (!isLoading && !isError && pack) {
    const card = pack.cards[cardIndex];

    const answerIds = card.options.reduce<string[]>((array, option) => {
      if (option.isCorrect) {
        array.push(option.id);
      }
      return array;
    }, []);

    return (
      <Stack w="full" maxW="container.lg">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading color={colorScheme}>
            {pack.name} - {!isDone ? "Quiz" : "Results"}
          </Heading>
          {!isDone ? (
            <Text>
              Question {cardIndex + 1} of {pack.cards.length}
            </Text>
          ) : null}
        </Flex>
        <VStack>
          {!isDone ? (
            <Stack w="full" maxW="3xl">
              <QuizCard card={card} />
              <QuizOptions
                card={card}
                answerInputState={[answerInput, setAnswerInput]}
                isAnswerShown={isAnswerShown}
              />
              {isAnswerShown ? (
                <Button
                  w="full"
                  onClick={() => {
                    const nextIndex = cardIndex + 1;
                    setProgress((nextIndex / pack.cards.length) * 100);
                    if (nextIndex < pack.cards.length) {
                      setCardIndex(nextIndex);
                    } else {
                      setIsDone(true);
                    }
                    setIsAnswerShown(false);
                    setAnswerInput(undefined);
                    closeAll();
                  }}
                >
                  {cardIndex + 1 < pack.cards.length
                    ? "Next Card"
                    : "View Results"}
                </Button>
              ) : (
                <Button
                  w="full"
                  disabled={!answerInput || answerInput.length < 1}
                  onClick={() => {
                    let isCorrect: boolean;
                    if (Array.isArray(answerInput)) {
                      isCorrect =
                        JSON.stringify(answerInput.sort()) ===
                        JSON.stringify(answerIds.sort());
                    } else if (card.type === CardType.BLANK) {
                      isCorrect =
                        answerInput?.toLowerCase().trim() ===
                        card.options[0].text.toLowerCase().trim();
                    } else {
                      isCorrect = answerInput === answerIds[0];
                    }
                    toast({
                      title: isCorrect ? "Correct!" : "Incorrect",
                      status: isCorrect ? "success" : "error",
                      duration: 3000,
                    });
                    if (isCorrect) {
                      setCorrectAmount(correctAmount + 1);
                    }
                    setIsAnswerShown(true);
                  }}
                >
                  Submit Answer
                </Button>
              )}
            </Stack>
          ) : (
            <QuizResults correct={correctAmount} total={pack.cards.length} />
          )}
        </VStack>
      </Stack>
    );
  }
  return (
    <Stack w="full" maxW="container.lg" align="center">
      <Spinner />
    </Stack>
  );
};
