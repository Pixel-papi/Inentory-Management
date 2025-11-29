import React from "react";
import { TextInputProps } from "react-native";
import { TextField } from "./TextField";

type Props = TextInputProps & {
  label: string;
  error?: string | null;
};

export const NumberField: React.FC<Props> = ({ label, error, ...rest }) => {
  return (
    <TextField label={label} error={error} keyboardType="numeric" {...rest} />
  );
};
