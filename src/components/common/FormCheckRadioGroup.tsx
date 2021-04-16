import React from "react";
import { CheckboxGroup, RadioGroup } from "@chakra-ui/react";

interface FormCheckRadioGroupProps {
  value?: string | string[];
}

export const FormCheckRadioGroup: React.FC<FormCheckRadioGroupProps> = ({
  children,
  value,
}) => {
  if (Array.isArray(value)) {
    return <CheckboxGroup value={value}>{children}</CheckboxGroup>;
  }
  return <RadioGroup value={value}>{children}</RadioGroup>;
};
