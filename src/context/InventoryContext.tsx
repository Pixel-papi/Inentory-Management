import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product, Transaction, User } from "@src/types";

type InventoryContextValue = {
  user: User | null;
  products: Product[];
  transactions: Transaction[];
  isBootstrapping: boolean;
  registerUser: (input: { email: string; fullName: string }) => Promise<void>;
  registerProduct: (input: {
    sku: string;
    name: string;
    price: number;
    quantity: number;
  }) => Promise<void>;
  adjustStock: (input: { productId: string; delta: number }) => Promise<void>;
};

const InventoryContext = createContext<InventoryContextValue | null>(null);

const generateId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

type Props = {
  children: React.ReactNode;
};

export const InventoryProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  // Simulate initial API bootstrapping
  useEffect(() => {
    const timer = setTimeout(() => setIsBootstrapping(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const registerUser = async (input: { email: string; fullName: string }) => {
    // realistic async boundary
    await new Promise((resolve) => setTimeout(resolve, 250));

    setUser({
      id: generateId(),
      email: input.email.trim(),
      fullName: input.fullName.trim(),
      createdAt: new Date().toISOString(),
    });
  };

  const registerProduct = async (input: {
    sku: string;
    name: string;
    price: number;
    quantity: number;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const now = new Date().toISOString();
    const product: Product = {
      id: generateId(),
      sku: input.sku.trim(),
      name: input.name.trim(),
      price: input.price,
      quantity: input.quantity,
      updatedAt: now,
    };

    setProducts((prev) => [...prev, product]);

    const tx: Transaction = {
      id: generateId(),
      productId: product.id,
      sku: product.sku,
      type: "CREATE_PRODUCT",
      delta: input.quantity,
      quantityBefore: 0,
      quantityAfter: input.quantity,
      timestamp: now,
    };

    setTransactions((prev) => [tx, ...prev]);
  };

  const adjustStock = async (input: { productId: string; delta: number }) => {
    await new Promise((resolve) => setTimeout(resolve, 250));

    setProducts((prevProducts) => {
      const idx = prevProducts.findIndex((p) => p.id === input.productId);
      if (idx === -1) {
        // In a real API, we would throw or surface an error;
        // here we fail silently to keep UI simple.
        return prevProducts;
      }

      const product = prevProducts[idx];
      const nextQuantity = product.quantity + input.delta;

      if (nextQuantity < 0) {
        // App-level validation should prevent this; guard anyway.
        return prevProducts;
      }

      const updatedAt = new Date().toISOString();
      const updatedProduct: Product = {
        ...product,
        quantity: nextQuantity,
        updatedAt,
      };

      // Write transaction from within same update to avoid race conditions
      setTransactions((prevTx) => {
        const tx: Transaction = {
          id: generateId(),
          productId: product.id,
          sku: product.sku,
          type: input.delta >= 0 ? "INCREASE" : "DECREASE",
          delta: input.delta,
          quantityBefore: product.quantity,
          quantityAfter: nextQuantity,
          timestamp: updatedAt,
        };
        return [tx, ...prevTx];
      });

      const clone = [...prevProducts];
      clone[idx] = updatedProduct;
      return clone;
    });
  };

  const value = useMemo<InventoryContextValue>(
    () => ({
      user,
      products,
      transactions,
      isBootstrapping,
      registerUser,
      registerProduct,
      adjustStock,
    }),
    [user, products, transactions, isBootstrapping]
  );

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventoryContext = (): InventoryContextValue => {
  const ctx = useContext(InventoryContext);
  if (!ctx) {
    throw new Error(
      "useInventoryContext must be used within an InventoryProvider"
    );
  }
  return ctx;
};
