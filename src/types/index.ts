export type User = {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  updatedAt: string;
};

export type TransactionType = "CREATE_PRODUCT" | "INCREASE" | "DECREASE";

export type Transaction = {
  id: string;
  productId: string;
  sku: string;
  type: TransactionType;
  delta: number;
  quantityBefore: number;
  quantityAfter: number;
  timestamp: string;
};
