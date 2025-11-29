import "./global.css";
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { InventoryProvider } from "./src/context/InventoryContext";
import { ScreenContainer } from "./src/components/layout/ScreenContainer";
import { SectionCard } from "./src/components/layout/SectionCard";
import { UserForm } from "./src/components/user/UserForm";
import { ProductForm } from "./src/components/product/ProductForm";
import { StockAdjustForm } from "./src/components/product/StockAdjustForm";
import { ProductStatusList } from "./src/components/product/ProductStatusList";
import { TransactionHistory } from "./src/components/history/TransactionHistory";

export default function App() {
  return (
    <InventoryProvider>
      <SafeAreaView className="flex-1 bg-slate-950">
        <StatusBar barStyle="light-content" />
        <ScreenContainer>
          <SectionCard
            title="User"
            subtitle="Register the operator using the system"
          >
            <UserForm />
          </SectionCard>

          <SectionCard
            title="Products"
            subtitle="Create products that can be stocked and adjusted"
          >
            <ProductForm />
          </SectionCard>

          <SectionCard
            title="Stock"
            subtitle="Increase or decrease inventory for existing products"
          >
            <StockAdjustForm />
          </SectionCard>

          <SectionCard
            title="Product Status"
            subtitle="Current quantity and last updated time per product"
          >
            <ProductStatusList />
          </SectionCard>

          <SectionCard
            title="Transaction History"
            subtitle="Every stock change with simple pagination"
          >
            <TransactionHistory />
          </SectionCard>
        </ScreenContainer>
      </SafeAreaView>
    </InventoryProvider>
  );
}
