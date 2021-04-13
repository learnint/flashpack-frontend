import React, { ChangeEventHandler } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Spinner,
  FormHelperText,
  Select,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";

interface FormSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  options: { value: string; label: string }[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  error: string | undefined;
  touched: boolean | undefined;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  placeholder,
  helperText,
  isDisabled,
  isLoading,
  options,
  onChange,
  error,
  touched,
}) => {
  const isInvalid = !!error && touched;
  const variant = isDisabled ? "unstyled" : "filled";

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
            <Select
              {...field}
              id={name}
              placeholder={placeholder}
              variant={variant}
              isDisabled={isDisabled}
              onChange={(e) => {
                field.onChange(e);
                onChange && onChange(e);
              }}
            >
              {options.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
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
