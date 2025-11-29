import React from "react";
import { Text, View } from "react-native";

type Props = {
  title: string;
  description?: string;
};

export const SectionHeader: React.FC<Props> = ({ title, description }) => {
  return (
    <View className="mb-3">
      <Text className="text-sm font-semibold text-slate-100">{title}</Text>
      {description ? (
        <Text className="mt-1 text-xs text-slate-400">{description}</Text>
      ) : null}
    </View>
  );
};
