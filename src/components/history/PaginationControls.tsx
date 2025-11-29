import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  page: number;
  pageCount: number;
  onPrev: () => void;
  onNext: () => void;
};

export const PaginationControls: React.FC<Props> = ({
  page,
  pageCount,
  onPrev,
  onNext,
}) => {
  if (pageCount <= 1) return null;

  return (
    <View className="mt-3 flex-row items-center justify-between">
      <TouchableOpacity
        className="rounded-xl border border-slate-700 px-3 py-1.5 disabled:opacity-50"
        onPress={onPrev}
        disabled={page === 1}
      >
        <Text className="text-xs text-slate-100">Previous</Text>
      </TouchableOpacity>

      <Text className="text-[11px] text-slate-400">
        Page {page} of {pageCount}
      </Text>

      <TouchableOpacity
        className="rounded-xl border border-slate-700 px-3 py-1.5 disabled:opacity-50"
        onPress={onNext}
        disabled={page === pageCount}
      >
        <Text className="text-xs text-slate-100">Next</Text>
      </TouchableOpacity>
    </View>
  );
};
