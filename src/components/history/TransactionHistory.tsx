import React, { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { useInventory } from "@src/hooks/useInventory";
import { formatDateTime } from "@src/utils/format";
import { PaginationControls } from "./PaginationControls";

const PAGE_SIZE = 5;

export const TransactionHistory: React.FC = () => {
  const { transactions } = useInventory();
  const [page, setPage] = useState(1);

  const sorted = useMemo(
    () =>
      [...transactions].sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ),
    [transactions]
  );

  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE);
  }, [sorted, page]);

  if (sorted.length === 0) {
    return (
      <Text className="text-xs text-slate-400">
        Stock adjustments will appear here as a timeline.
      </Text>
    );
  }

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(pageCount, p + 1));

  return (
    <View>
      <View className="space-y-2">
        {pageItems.map((tx) => (
          <View
            key={tx.id}
            className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2"
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-xs font-semibold text-slate-50">
                {tx.type === "CREATE_PRODUCT"
                  ? "Created product"
                  : tx.type === "INCREASE"
                  ? "Increased stock"
                  : "Decreased stock"}
              </Text>
              <Text className="text-[10px] text-slate-400">
                {formatDateTime(tx.timestamp)}
              </Text>
            </View>

            <View className="mt-1 flex-row justify-between">
              <Text className="text-[11px] text-slate-300">SKU: {tx.sku}</Text>
              <Text className="text-[11px] text-slate-200">
                Δ {tx.delta > 0 ? `+${tx.delta}` : tx.delta}
              </Text>
            </View>

            <Text className="mt-1 text-[10px] text-slate-400">
              {tx.quantityBefore} → {tx.quantityAfter}
            </Text>
          </View>
        ))}
      </View>

      <PaginationControls
        page={page}
        pageCount={pageCount}
        onPrev={goPrev}
        onNext={goNext}
      />
    </View>
  );
};
