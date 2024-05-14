import { IProduct } from "@/components/Product";
import { setStorageItemAsync } from "@/hooks/useStorageState";

import * as SecureStore from "expo-secure-store";


const cartFromStorage = JSON.parse(SecureStore.getItem("cart")!) as CartState | null;
export const cartInitialState: CartState = cartFromStorage ?? { cart: [] };

//Possible Actions
export enum CartActionKind {
  ADD = "ADD",
  REMOVE = "REMOVE",
  REDUCE = "REDUCE",
  CLEAR = "CLEAR",
}

// An interface for our actions
export interface CartAction {
  type: CartActionKind;
  payload?: CartProduct;
}

export interface CartProduct {
  product: IProduct;
  quantity: number;
}

// An interface for our state
export interface CartState {
  cart: CartProduct[];
}

// update localStorage with state for cart
export const updateLocalStorage = (state: CartState) => {
  setStorageItemAsync("cart", JSON.stringify(state.cart));
};

// Our reducer function that uses a switch statement to handle our actions
export function cartReducer(state: CartState, action: CartAction) {
  const { type, payload } = action;

  switch (type) {
    case CartActionKind.ADD:
      const idToAdd = payload!.product.id;

      if (!state.cart) {
        const updatedCart = [{ product: payload!.product, quantity: 1 }];
        updateLocalStorage({ cart: updatedCart });
        return { cart: updatedCart };
      }

      const existingProductIndex = state.cart.findIndex(
        (product) => product.product.id === idToAdd
      );

      if (existingProductIndex !== -1) {
        // Clonamos el estado anterior y actualizamos la cantidad del producto existente
        const updatedCart = state.cart.map((product, index) =>
          index === existingProductIndex
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
        updateLocalStorage({ cart: updatedCart });
        return { cart: updatedCart }; // Devolvemos un nuevo estado con el carrito actualizado
      } else {
        // Clonamos el estado anterior y agregamos el nuevo producto al carrito
        const updatedCart = [
          ...state.cart,
          { product: payload!.product, quantity: 1 },
        ];
        updateLocalStorage({ cart: updatedCart });
        return { cart: updatedCart }; // Devolvemos un nuevo estado con el carrito actualizado
      }

    case CartActionKind.REMOVE:
      const idToRemove = payload!.product.id;
      const updatedCart = state.cart.filter(
        (product) => product.product.id !== idToRemove
      );
      updateLocalStorage({ cart: updatedCart });
      return { cart: updatedCart }; // Devolvemos un nuevo estado con el carrito actualizado

    case CartActionKind.REDUCE:
      // Reducir la cantidad de un producto en 1 y eliminarlo si la cantidad llega a 0
      const newState = state.cart
        .map((product) =>
          product.product.id === payload!.product.id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
        .filter((product) => product.quantity > 0); // Eliminar productos con cantidad 0

      updateLocalStorage({ cart: newState });
      return { cart: newState }; // Devolver un nuevo estado con el carrito actualizado

    case CartActionKind.CLEAR:
      updateLocalStorage({ cart: [] }); // Limpiamos el almacenamiento local
      return { cart: [] }; // Devolvemos un nuevo estado con el carrito vacío

    default:
      return state;
  }
}
