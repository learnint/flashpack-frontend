import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Spinner,
  FormHelperText,
  Radio,
  Checkbox,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";

interface FormCheckRadioProps {
  name: string;
  label?: string;
  helperText?: string;
  type?: "radio" | "checkbox";
  isDisabled?: boolean;
  isLoading?: boolean;
  value: number;
  error: string | undefined;
  touched: boolean | undefined;
}

export const FormCheckRadio: React.FC<FormCheckRadioProps> = ({
  name,
  label,
  helperText,
  type = "radio",
  isDisabled,
  isLoading,
  value,
  error,
  touched,
}) => {
  const isInvalid = !!error && touched;

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
            type === "checkbox" ? (
              <Checkbox
                {...field}
                id={name}
                value={value.toString()}
                isDisabled={isDisabled}
                size="lg"
              />
            ) : (
              <Radio
                {...field}
                id={name}
                value={value.toString()}
                isDisabled={isDisabled}
                size="lg"
              />
            )
          ) : (
            <Spinner size="sm" />
          )}
          {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
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
