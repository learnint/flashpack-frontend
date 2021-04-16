import React from "react";
import { CheckboxGroup, RadioGroup } from "@chakra-ui/react";

interface FormCheckRadioGroupProps {
  defaultValue?: string | string[];
}

export const FormCheckRadioGroup: React.FC<FormCheckRadioGroupProps> = ({
  children,
  defaultValue,
}) => {
  if (Array.isArray(defaultValue)) {
    return (
      <CheckboxGroup defaultValue={defaultValue}>{children}</CheckboxGroup>
    );
  }
  return <RadioGroup defaultValue={defaultValue}>{children}</RadioGroup>;
};
