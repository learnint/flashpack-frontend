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
} from "@chakra-ui/react";
import { Field, FieldInputProps, FieldProps } from "formik";
import { State } from "models";

interface FormInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  showState?: State<boolean>;
  isDisabled?: boolean;
  error: string | undefined;
  touched: boolean | undefined;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  placeholder,
  type,
  showState,
  isDisabled,
  error,
  touched,
}) => {
  const isInvalid = !!error && touched;
  const variant = isDisabled ? "unstyled" : "filled";

  const renderPasswordInput = (
    field: FieldInputProps<any>,
    showState: State<boolean>
  ) => {
    const [show, setShow] = showState;
    return (
      <InputGroup>
        <Input
          {...field}
          id={name}
          placeholder={placeholder}
          type={show ? "text" : type}
          variant={variant}
          isDisabled={isDisabled}
          pr={!isDisabled ? "16" : "0"}
        />
        {!isDisabled ? (
          <InputRightElement w="16">
            <Button size="xs" onClick={() => setShow(!show)} tabIndex={-1}>
              {show ? "Hide" : "Show"}
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
          {label ? <FormLabel htmlFor={name}>{label}</FormLabel> : null}
          {type === "password" && showState ? (
            renderPasswordInput(field, showState)
          ) : (
            <Input
              {...field}
              id={name}
              placeholder={placeholder}
              type={type}
              variant={variant}
              isDisabled={isDisabled}
            />
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
