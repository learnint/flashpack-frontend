import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";

interface FormInputProps {
  name: string;
  label: string;
  placeholder: string;
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

  return (
    <Field name={name}>
      {/* https://github.com/formium/formik/issues/2086 */}
      {({ field }: FieldProps) => (
        <FormControl isInvalid={!!error && touched}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          {type === "password" ? (
            <InputGroup>
              <Input
                {...field}
                id={name}
                placeholder={placeholder}
                type={show ? "text" : type}
                pr="4rem"
              />
              <InputRightElement w="4rem">
                <Button size="xs" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          ) : (
            <Input {...field} id={name} placeholder={placeholder} type={type} />
          )}
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};
