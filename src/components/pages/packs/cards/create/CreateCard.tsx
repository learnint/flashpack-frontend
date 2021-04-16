import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { useHistory, useRouteMatch } from "react-router-dom";
import { FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { useCard } from "context";
import {
  FormInput,
  FormSelect,
  FormCheckRadio,
  FormCheckRadioGroup,
} from "components/common";
import { CardType, Pack } from "models";
import { useColorScheme } from "theme";
import { type, question, answerIndex, options } from "validations/Card";
import { onePathBack } from "router";
import { convertCardType } from "../convertCardType";

interface CreateCardProps {
  pack: Pack;
}

export const CreateCard: React.FC<CreateCardProps> = ({ pack }) => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const colorScheme = useColorScheme();
  const { createCard } = useCard();

  const getCardOptions = (
    type: CardType,
    prevType: CardType,
    prevOptions: string[]
  ) => {
    switch (type) {
      case CardType.TF:
        return ["True", "False"];
      case CardType.MC:
      case CardType.CHK:
        return prevType === CardType.MC || prevType === CardType.CHK
          ? prevOptions
          : ["", "", ""];
      case CardType.BLANK:
        return [""];
    }
  };

  const cardsPath = onePathBack(url);

  return (
    <Stack w="full" maxW="container.sm">
      <Heading color={colorScheme}>{pack.name} - Create Card</Heading>
      <Formik<{
        type: CardType;
        question: string;
        answerIndex: string | string[];
        options: string[];
      }>
        initialValues={{
          type: CardType.TF,
          question: "",
          answerIndex: "",
          options: ["True", "False"],
        }}
        validationSchema={Yup.object({ type, question, answerIndex, options })}
        onSubmit={async ({ type, question, answerIndex, options }) => {
          const card = {
            type,
            question,
            options: options.map((option, index) => ({
              text: option,
              isCorrect: answerIndex.includes(index.toString()),
              order: index,
            })),
          };
          const success = await createCard({
            ...card,
            packId: pack.id,
          });
          if (success) {
            history.push(cardsPath);
          }
        }}
        // Without this, form performance is bloody abysmal - *UPDATE* this applies to develop server only, fine in production
        // validateOnChange={false}
      >
        {({ values, setFieldValue, isSubmitting, errors, touched }) => (
          <Form>
            <FormSelect
              name="type"
              label="Type"
              options={[
                { value: CardType.TF, label: convertCardType(CardType.TF) },
                { value: CardType.MC, label: convertCardType(CardType.MC) },
                { value: CardType.CHK, label: convertCardType(CardType.CHK) },
                {
                  value: CardType.BLANK,
                  label: convertCardType(CardType.BLANK),
                },
              ]}
              onChange={(e) => {
                const type = e.currentTarget.value as CardType;
                setFieldValue(
                  "answerIndex",
                  type === CardType.BLANK ? "0" : ""
                );
                setFieldValue(
                  "options",
                  getCardOptions(type, values.type, values.options)
                );
              }}
              error={errors.type}
              touched={touched.type}
            />
            <FormInput
              name="question"
              label="Question"
              placeholder="Question prompt"
              type="textarea"
              error={errors.question}
              touched={touched.question}
            />
            <FieldArray name="options">
              {({ insert, remove, push }) => (
                <Flex direction="column" mb="8">
                  <Flex mb="2">
                    {values.type !== CardType.BLANK ? (
                      <Text w="75px" fontWeight="bold">
                        Correct
                      </Text>
                    ) : null}
                    <Text fontWeight="bold">
                      {values.type !== CardType.BLANK ? "Options" : "Answer"}
                    </Text>
                  </Flex>
                  <FormCheckRadioGroup
                    key={values.type}
                    value={values.answerIndex}
                  >
                    {values.options.length > 0 &&
                      values.options.map((_, index) => (
                        <Flex alignItems="flex-start" key={index}>
                          {values.type !== CardType.BLANK ? (
                            <Box w="75px" shrink={0}>
                              <FormCheckRadio
                                name="answerIndex"
                                value={index.toString()}
                                type={
                                  values.type === CardType.CHK
                                    ? "checkbox"
                                    : "radio"
                                }
                                error={errors.answerIndex}
                                touched={touched.answerIndex}
                              />
                            </Box>
                          ) : null}
                          <Flex flex="auto">
                            <FormInput
                              name={`options.${index}`}
                              type={
                                values.type !== CardType.TF
                                  ? "textarea"
                                  : undefined
                              }
                              isDisabled={values.type === CardType.TF}
                              error={
                                Array.isArray(errors.options)
                                  ? errors.options[index]
                                  : errors.options
                              }
                              touched={
                                Array.isArray(touched.options)
                                  ? touched.options[index]
                                  : touched.options
                              }
                            />
                            {values.type !== CardType.TF &&
                            values.type !== CardType.BLANK ? (
                              <IconButton
                                ml="2"
                                icon={<FaTimes />}
                                aria-label="Remove Option"
                                onClick={() => {
                                  setFieldValue("answerIndex", "");
                                  remove(index);
                                }}
                                isDisabled={values.options.length <= 2}
                              />
                            ) : null}
                          </Flex>
                        </Flex>
                      ))}
                  </FormCheckRadioGroup>
                  {values.type !== CardType.TF &&
                  values.type !== CardType.BLANK ? (
                    <Button
                      onClick={() => push("")}
                      isDisabled={values.options.length >= 10}
                    >
                      Add Option
                    </Button>
                  ) : null}
                </Flex>
              )}
            </FieldArray>
            <Flex mt="2">
              <Button type="submit" isLoading={isSubmitting} mr="2" flex="auto">
                Create Card
              </Button>
              <Button
                onClick={() => history.push(cardsPath)}
                isDisabled={isSubmitting}
                flex="auto"
              >
                Cancel
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
