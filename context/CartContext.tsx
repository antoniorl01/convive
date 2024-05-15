import React, { createContext, useContext, useReducer } from "react";
import { CartActionKind, CartState, cartInitialState, cartReducer } from '@/reducers/cart'
import { IProduct } from "@/components/Product";

// 1. Create context
export const CartContext = createContext<{
  cart: CartState | null;
  addToCart: (product: IProduct, quantity: number) => void;
  removeFromCart: (product: IProduct, quantity: number) => void;
  reduceFromCart: (product: IProduct) => void;
  clearCart: () => void;
}>({
  cart: null,
  addToCart: () => {},
  removeFromCart: () => {},
  reduceFromCart: () => {},
  clearCart: () => {},
});

// 2. Create provider to provide context
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)


  const addToCart = (product: IProduct, quantity: number) => dispatch({
    type: CartActionKind.ADD,
    payload: { product, quantity } 
  });

  const removeFromCart = (product: IProduct, quantity: number) => dispatch({
    type: CartActionKind.REMOVE,
    payload: { product, quantity }
  });

  const reduceFromCart = (product: IProduct) => dispatch({
    type: CartActionKind.REDUCE,
    payload: { product, quantity: 1 }
  });

  const clearCart = () => dispatch({ 
    type: CartActionKind.CLEAR
  });

  // Use the updated state after dispatching an action
  const value = {
    cart: state,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    clearCart: clearCart,
    reduceFromCart: reduceFromCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// 3. Consume -> useContext(CartContext)
export function useCart() {
  const value = useContext(CartContext);
  if (!value) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return value;
}
