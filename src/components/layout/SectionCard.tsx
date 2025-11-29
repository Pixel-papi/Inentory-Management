import React from "react";
import { Text, View } from "react-native";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export const SectionCard: React.FC<Props> = ({ title, subtitle, children }) => {
  return (
    <View className="mb-4 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-4">
      <View className="mb-3">
        <Text className="text-base font-semibold text-slate-50">{title}</Text>
        {subtitle ? (
          <Text className="mt-1 text-xs text-slate-400">{subtitle}</Text>
        ) : null}
      </View>
      {children}
    </View>
  );
};
