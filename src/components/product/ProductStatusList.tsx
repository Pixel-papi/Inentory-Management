import React from "react";
import { Text, View } from "react-native";
import { useInventory } from "@src/hooks/useInventory";
import { formatCurrency, formatDateTime } from "@src/utils/format";

export const ProductStatusList: React.FC = () => {
  const { products } = useInventory();

  if (products.length === 0) {
    return (
      <Text className="text-xs text-slate-400">
        Once you create products, their current stock will appear here.
      </Text>
    );
  }

  return (
    <View className="space-y-2">
      {products.map((product) => (
        <View
          key={product.id}
          className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2"
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-semibold text-slate-50">
              {product.name}
            </Text>
            <Text className="text-xs text-slate-300">
              {formatCurrency(product.price)}
            </Text>
          </View>
          <View className="mt-1 flex-row justify-between">
            <Text className="text-[11px] text-slate-400">
              SKU: {product.sku}
            </Text>
            <Text className="text-[11px] text-slate-200">
              Quantity: {product.quantity}
            </Text>
          </View>
          <Text className="mt-1 text-[10px] text-slate-500">
            Last updated: {formatDateTime(product.updatedAt)}
          </Text>
        </View>
      ))}
    </View>
  );
};
