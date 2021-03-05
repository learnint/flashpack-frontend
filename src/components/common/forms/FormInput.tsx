import React, { useState } from "react";
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
import { Field, FieldProps } from "formik";

interface FormInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  error: string | undefined;
  touched: boolean | undefined;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  placeholder,
  type,
  error,
  touched,
}) => {
  const [show, setShow] = useState(false);
  const isInvalid = !!error && touched;

  return (
    <Field name={name}>
      {/* https://github.com/formium/formik/issues/2086 */}
      {({ field }: FieldProps) => (
        <FormControl isInvalid={isInvalid}>
          {label ? <FormLabel htmlFor={name}>{label}</FormLabel> : null}
          {type === "password" ? (
            <InputGroup>
              <Input
                {...field}
                id={name}
                placeholder={placeholder}
                type={show ? "text" : type}
                pr="16"
              />
              <InputRightElement w="16">
                <Button size="xs" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          ) : (
            <Input {...field} id={name} placeholder={placeholder} type={type} />
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
