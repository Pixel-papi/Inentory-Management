export const formatCurrency = (value: number): string => {
  if (Number.isNaN(value)) return "-";
  return `$${value.toFixed(2)}`;
};

export const formatDateTime = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString();
};
