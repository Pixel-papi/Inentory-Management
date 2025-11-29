import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TextField } from "@src/components/forms/TextField";
import { SectionHeader } from "@src/components/forms/SectionHeader";
import { useInventory } from "@src/hooks/useInventory";
import { isNonEmpty, isValidEmail } from "@src/utils/validation";

export const UserForm: React.FC = () => {
  const { registerUser, user } = useInventory();
  const [email, setEmail] = useState(user?.email ?? "");
  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [errors, setErrors] = useState<{ email?: string; fullName?: string }>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors: { email?: string; fullName?: string } = {};
    if (!isValidEmail(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!isNonEmpty(fullName)) {
      nextErrors.fullName = "Full name is required.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await registerUser({ email, fullName });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View>
      <SectionHeader
        title="Operator"
        description="Basic details of the user operating this inventory."
      />

      <TextField
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
        error={errors.email}
      />

      <TextField
        label="Full name"
        value={fullName}
        onChangeText={setFullName}
        autoCapitalize="words"
        error={errors.fullName}
      />

      <TouchableOpacity
        className="mt-2 flex-row items-center justify-center rounded-xl bg-brand-600 px-4 py-2 disabled:opacity-60"
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text className="text-sm font-semibold text-slate-50">
          {isSubmitting ? "Saving…" : user ? "Update user" : "Register user"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
