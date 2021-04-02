import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  InputGroup,
  InputRightElement,
  Box,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { Field, FieldInputProps, FieldProps } from "formik";
import { State } from "models";

interface FormInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  isShownState?: State<boolean>;
  isDisabled?: boolean;
  isLoading?: boolean;
  error: string | undefined;
  touched: boolean | undefined;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  placeholder,
  type,
  isShownState,
  isDisabled,
  isLoading,
  error,
  touched,
}) => {
  const isInvalid = !!error && touched;
  const variant = isDisabled ? "unstyled" : "filled";

  const renderPasswordInput = (
    field: FieldInputProps<any>,
    isShownState: State<boolean>
  ) => {
    const [isShown, setIsShown] = isShownState;
    return (
      <InputGroup>
        <Input
          {...field}
          id={name}
          placeholder={placeholder}
          type={isShown ? "text" : type}
          variant={variant}
          isDisabled={isDisabled}
          pr={!isDisabled ? "16" : "0"}
        />
        {!isDisabled ? (
          <InputRightElement w="16">
            <Button
              size="xs"
              onClick={() => setIsShown(!isShown)}
              tabIndex={-1}
            >
              {isShown ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        ) : null}
      </InputGroup>
    );
  };

  return (
    <Field name={name}>
      {/* https://github.com/formium/formik/issues/2086 */}
      {({ field }: FieldProps) => (
        <FormControl isInvalid={isInvalid}>
          {label ? (
            <FormLabel htmlFor={name} fontWeight="bold">
              {label}
            </FormLabel>
          ) : null}
          {!isLoading ? (
            type === "password" && isShownState ? (
              renderPasswordInput(field, isShownState)
            ) : type === "textarea" ? (
              <Textarea
                {...field}
                id={name}
                placeholder={placeholder}
                type={type}
                variant={variant}
                isDisabled={isDisabled}
              />
            ) : (
              <Input
                {...field}
                id={name}
                placeholder={placeholder}
                type={type}
                variant={variant}
                isDisabled={isDisabled}
              />
            )
          ) : (
            <Spinner size="sm" />
          )}
          {isInvalid ? (
            <FormErrorMessage h="5" mb="1">
              {error}
            </FormErrorMessage>
          ) : (
            <Box h="5" mt="2" mb="1" />
          )}
        </FormControl>
      )}
    </Field>
  );
};
