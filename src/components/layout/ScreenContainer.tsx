import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useInventory } from "@src/hooks/useInventory";

type Props = {
  children: React.ReactNode;
};

export const ScreenContainer: React.FC<Props> = ({ children }) => {
  const { user, isBootstrapping } = useInventory();

  return (
    <ScrollView
      className="flex-1 px-4 pt-4 pb-10 bg-slate-950"
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <View className="mb-6">
        <Text className="text-2xl font-semibold text-slate-50">
          Inventory Manager
        </Text>
        <Text className="mt-1 text-sm text-slate-300">
          React Native (Expo) • Local state • NativeWind
        </Text>

        <View className="mt-3 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2">
          {isBootstrapping ? (
            <Text className="text-xs text-slate-400">
              Bootstrapping local data…
            </Text>
          ) : user ? (
            <Text className="text-xs text-slate-300">
              Signed in as{" "}
              <Text className="font-semibold">{user.fullName}</Text> (
              {user.email})
            </Text>
          ) : (
            <Text className="text-xs text-slate-400">
              No user registered yet. Start by registering a user below.
            </Text>
          )}
        </View>
      </View>

      {children}
    </ScrollView>
  );
};
