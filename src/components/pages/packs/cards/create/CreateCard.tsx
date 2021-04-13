import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { FormInput, FormSelect } from "components/common";
import { CardType, Pack } from "models";
import { useColorScheme } from "theme";
import { FormCheckRadio } from "components/common/FormCheckRadio";

interface CreateCardProps {
  pack: Pack;
  groupId: string;
}

export const CreateCard: React.FC<CreateCardProps> = ({ pack, groupId }) => {
  const history = useHistory();
  const colorScheme = useColorScheme();
  // const { createCard } = useCard();

  const getCardOptions = (
    type: CardType,
    prevType: CardType,
    prevOptions: string[]
  ) => {
    switch (type) {
      case "tf":
        return ["True", "False"];
      case "mc":
      case "chk":
        return prevType === "mc" || prevType === "chk"
          ? prevOptions
          : ["", "", ""];
      case "blank":
        return [""];
    }
  };

  const cardsPath = groupId
    ? `/groups/${groupId}/packs/${pack.id}/cards`
    : `/packs/${pack.id}/cards`;

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
          type: "tf",
          question: "",
          answerIndex: "",
          options: ["True", "False"],
        }}
        validationSchema={Yup.object({})}
        onSubmit={async ({ type, question, answerIndex, options }) => {
          // const success = await createPack({
          //   groupId: group?.id,
          //   body: values,
          // });
          // if (success) {
          //   history.push(cardsPath);
          // }
          const card = {
            type,
            question,
            options: options.map((option, index) => ({
              text: option,
              isCorrect: answerIndex.includes(index.toString()),
            })),
          };
          alert(
            JSON.stringify({ type, question, answerIndex, options }, null, 4)
          );
          alert(JSON.stringify(card, null, 4));
        }}
      >
        {({ values, setFieldValue, isSubmitting, errors, touched }) => (
          <Form>
            <FormSelect
              name="type"
              label="Type"
              options={[
                { value: "tf", label: "True/False" },
                { value: "mc", label: "Multiple Choice" },
                { value: "chk", label: "Check All That Apply" },
                { value: "blank", label: "Fill In The Blank" },
              ]}
              onChange={(e) => {
                const type = e.currentTarget.value as CardType;
                setFieldValue("answerIndex", type === "blank" ? "0" : "");
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
                <div>
                  <Flex mb="2">
                    {values.type !== "blank" ? (
                      <Text w="75px" fontWeight="bold">
                        Correct
                      </Text>
                    ) : null}
                    <Text fontWeight="bold">
                      {values.type !== "blank" ? "Options" : "Answer"}
                    </Text>
                  </Flex>
                  <RadioGroup key={values.type}>
                    {values.options.length > 0 &&
                      values.options.map((_, index) => (
                        <Flex alignItems="flex-start" key={index}>
                          {values.type !== "blank" ? (
                            <Box w="75px" shrink={0}>
                              <FormCheckRadio
                                name="answerIndex"
                                value={index}
                                type={
                                  values.type === "chk" ? "checkbox" : "radio"
                                }
                                error={errors.question}
                                touched={touched.question}
                              />
                            </Box>
                          ) : null}
                          <Box flex="auto">
                            <FormInput
                              name={`options.${index}`}
                              type={
                                values.type !== "tf" ? "textarea" : undefined
                              }
                              isDisabled={values.type === "tf"}
                              error={errors.question}
                              touched={touched.question}
                            />
                          </Box>
                        </Flex>
                      ))}
                  </RadioGroup>
                </div>
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
