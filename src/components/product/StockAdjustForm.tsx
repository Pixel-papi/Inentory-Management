import React, { useMemo, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Pressable,
  FlatList,
} from "react-native";
import { NumberField } from "@src/components/forms/NumberField";
import { SectionHeader } from "@src/components/forms/SectionHeader";
import { useInventory } from "@src/hooks/useInventory";
import { isNonNegativeInteger } from "@src/utils/validation";

export const StockAdjustForm: React.FC = () => {
  const { products, adjustStock } = useInventory();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [amount, setAmount] = useState("1");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === selectedId) ?? null,
    [products, selectedId]
  );

  const validate = () => {
    if (!selectedProduct) {
      setError("Select a product to adjust.");
      return false;
    }
    if (!isNonNegativeInteger(amount)) {
      setError("Amount must be a non-negative integer.");
      return false;
    }
    if (Number(amount) === 0) {
      setError("Amount must be greater than 0.");
      return false;
    }
    setError(null);
    return true;
  };

  const submit = async (direction: "INCREASE" | "DECREASE") => {
    if (!validate() || !selectedProduct) return;
    const delta = Number(amount) * (direction === "INCREASE" ? 1 : -1);

    if (selectedProduct.quantity + delta < 0) {
      setError("Stock cannot go negative.");
      return;
    }

    setIsSubmitting(true);
    try {
      await adjustStock({ productId: selectedProduct.id, delta });
      setAmount("1");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View>
      <SectionHeader
        title="Adjust stock"
        description="Pick a product and increase or decrease its quantity."
      />

      {products.length === 0 ? (
        <Text className="text-xs text-slate-400">
          No products yet. Create a product first.
        </Text>
      ) : (
        <View className="mb-3">
          <Text className="mb-2 text-xs font-medium text-slate-200">
            Select product
          </Text>
          <FlatList
            data={products}
            horizontal
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              const isActive = item.id === selectedId;
              return (
                <Pressable
                  onPress={() => setSelectedId(item.id)}
                  className={`mr-2 rounded-xl border px-3 py-2 ${
                    isActive
                      ? "border-brand-500 bg-brand-600/20"
                      : "border-slate-700 bg-slate-900"
                  }`}
                >
                  <Text className="text-xs font-semibold text-slate-50">
                    {item.sku}
                  </Text>
                  <Text className="text-[10px] text-slate-300">
                    Qty: {item.quantity}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>
      )}

      <NumberField
        label="Amount"
        value={amount}
        onChangeText={setAmount}
        error={error ?? undefined}
      />

      <View className="mt-2 flex-row space-x-2">
        <TouchableOpacity
          className="flex-1 items-center justify-center rounded-xl bg-emerald-600 px-3 py-2 disabled:opacity-60"
          disabled={isSubmitting || products.length === 0}
          onPress={() => submit("INCREASE")}
        >
          <Text className="text-sm font-semibold text-slate-50">
            + Increase
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 items-center justify-center rounded-xl bg-rose-600 px-3 py-2 disabled:opacity-60"
          disabled={isSubmitting || products.length === 0}
          onPress={() => submit("DECREASE")}
        >
          <Text className="text-sm font-semibold text-slate-50">
            − Decrease
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
