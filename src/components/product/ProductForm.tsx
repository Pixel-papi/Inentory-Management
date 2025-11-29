import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SectionHeader } from "@src/components/forms/SectionHeader";
import { TextField } from "@src/components/forms/TextField";
import { NumberField } from "@src/components/forms/NumberField";
import { useInventory } from "@src/hooks/useInventory";
import {
  isNonEmpty,
  isNonNegativeInteger,
  isPositiveNumber,
} from "@src/utils/validation";

type Errors = {
  sku?: string;
  name?: string;
  price?: string;
  quantity?: string;
};

export const ProductForm: React.FC = () => {
  const { registerProduct } = useInventory();
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("0");
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const next: Errors = {};
    if (!isNonEmpty(sku)) next.sku = "SKU is required.";
    if (!isNonEmpty(name)) next.name = "Name is required.";
    if (!isPositiveNumber(price)) next.price = "Price must be > 0.";
    if (!isNonNegativeInteger(quantity)) {
      next.quantity = "Quantity must be a non-negative integer.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const reset = () => {
    setSku("");
    setName("");
    setPrice("");
    setQuantity("0");
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await registerProduct({
        sku,
        name,
        price: Number(price),
        quantity: Number(quantity),
      });
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View>
      <SectionHeader
        title="Create product"
        description="New products become available for stock adjustments."
      />

      <TextField
        label="SKU"
        value={sku}
        onChangeText={setSku}
        autoCapitalize="characters"
        error={errors.sku}
      />

      <TextField
        label="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        error={errors.name}
      />

      <NumberField
        label="Price"
        value={price}
        onChangeText={setPrice}
        placeholder="e.g. 19.99"
        error={errors.price}
      />

      <NumberField
        label="Initial quantity"
        value={quantity}
        onChangeText={setQuantity}
        error={errors.quantity}
      />

      <TouchableOpacity
        className="mt-2 flex-row items-center justify-center rounded-xl bg-brand-600 px-4 py-2 disabled:opacity-60"
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text className="text-sm font-semibold text-slate-50">
          {isSubmitting ? "Creating…" : "Create product"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
