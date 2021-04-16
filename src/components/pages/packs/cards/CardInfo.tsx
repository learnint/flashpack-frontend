import React from "react";
import { Flex, Box, IconButton, Button, Text } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useCard } from "context";
import { Card, CardType, State } from "models";
import {
  FormSelect,
  FormInput,
  FormCheckRadio,
  FormCheckRadioGroup,
} from "components/common";
import { type, question, answerIndex, options } from "validations/Card";
import { convertCardType } from "./convertCardType";

interface CardInfoProps {
  card: Card;
  isEditingState: State<boolean>;
}

export const CardInfo: React.FC<CardInfoProps> = ({ card, isEditingState }) => {
  const { updateCard } = useCard();

  const [isEditing, setIsEditing] = isEditingState;

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

  const sortedCardOptions = card.options.sort((a, b) => a.order - b.order);

  const answerIndexArray = sortedCardOptions.reduce<string[]>(
    (array, option, index) => {
      if (option.isCorrect) {
        array.push(index.toString());
      }
      return array;
    },
    []
  );

  return (
    <Formik<{
      type: CardType;
      question: string;
      answerIndex: string | string[];
      options: string[];
    }>
      enableReinitialize
      initialValues={{
        type: card.type,
        question: card.question,
        answerIndex:
          card.type === CardType.CHK ? answerIndexArray : answerIndexArray[0],
        options: sortedCardOptions.map((option) => option.text),
      }}
      validationSchema={Yup.object({ type, question, answerIndex, options })}
      onSubmit={async ({ type, question, answerIndex, options }) => {
        const updatedCard = {
          type,
          question,
          options: options.map((option, index) => ({
            text: option,
            isCorrect: answerIndex.includes(index.toString()),
            order: index,
          })),
        };
        const success = await updateCard({ id: card.id, body: updatedCard });
        if (success) {
          setIsEditing(false);
        }
      }}
      onReset={() => setIsEditing(false)}
    >
      {({ values, setFieldValue, isSubmitting, errors, touched, dirty }) => (
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
              setFieldValue("answerIndex", type === CardType.BLANK ? "0" : "");
              setFieldValue(
                "options",
                getCardOptions(type, values.type, values.options)
              );
            }}
            isDisabled={!isEditing}
            error={errors.type}
            touched={touched.type}
          />
          <FormInput
            name="question"
            label="Question"
            placeholder="Question prompt"
            type="textarea"
            isDisabled={!isEditing}
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
                  defaultValue={values.answerIndex}
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
                              isDisabled={!isEditing}
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
                            isDisabled={
                              !isEditing || values.type === CardType.TF
                            }
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
                              onClick={() => remove(index)}
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
          {isEditing ? (
            <Flex mt="2">
              <Button
                type="submit"
                isLoading={isSubmitting}
                isDisabled={!dirty}
                mr="2"
                flex="auto"
              >
                Save Card Info
              </Button>
              <Button type="reset" isDisabled={isSubmitting} flex="auto">
                Cancel
              </Button>
            </Flex>
          ) : null}
        </Form>
      )}
    </Formik>
  );
};
