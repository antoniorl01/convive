import { createContext, useContext } from "react";

// 1. Create context
export const CartContext = createContext();

// 2. Create provider to provide context
export function CartProvider({ children }) {
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// 3. Consume -> useContext(CartProvider)
export function useCart() {
  const value = useContext(CartContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useCart must be wrapped in a <CartProvider />");
    }
  }
  return value;
}
