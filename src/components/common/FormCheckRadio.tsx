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
import { Field as SlowField, FastField, FieldProps } from "formik";

interface FormCheckRadioProps {
  name: string;
  label?: string;
  helperText?: string;
  type?: "radio" | "checkbox";
  isDisabled?: boolean;
  isLoading?: boolean;
  value: string;
  error: string | undefined;
  touched: boolean | undefined;
  fast?: boolean;
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
  fast = false,
}) => {
  const isInvalid = !!error && touched;

  const Field = fast ? FastField : SlowField;

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
                value={value}
                isDisabled={isDisabled}
                size="lg"
              />
            ) : (
              <Radio
                {...field}
                id={name}
                value={value}
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
