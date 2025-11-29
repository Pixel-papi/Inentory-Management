import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
  label: string;
  error?: string | null;
};

export const TextField: React.FC<Props> = ({ label, error, ...rest }) => {
  return (
    <View className="mb-3">
      <Text className="mb-1 text-xs font-medium text-slate-200">{label}</Text>
      <TextInput
        className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50"
        placeholderTextColor="#64748b"
        {...rest}
      />
      {error ? (
        <Text className="mt-1 text-xs text-rose-400">{error}</Text>
      ) : null}
    </View>
  );
};
