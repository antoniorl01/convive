import { createContext, useContext, useReducer } from "react";
import { cartReducer, cartInitialState } from '../reducers/cart.js'

// 1. Create context
export const CartContext = createContext();

// 2. Create provider to provide context
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = product => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })

  const removeFromCart = product => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const value = {
    cart: state,
    addToCart,
    removeFromCart,
    clearCart,
  };

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
