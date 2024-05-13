import { IProduct } from "@/components/Product";
import { setStorageItemAsync } from "@/hooks/useStorageState";

//import * as SecureStore from "expo-secure-store";

//export const cartInitialState = JSON.parse(SecureStore.getItem("cart")) || [];

//Possible Acttions
enum CartActionKind {
  ADD = "ADD",
  REMOVE = "REMOVE",
  REDUCE = "REDUCE",
  CLEAR = "CLEAR",
}

// An interface for our actions
interface CartAction {
  type: CartActionKind;
  payload: IProduct;
}

// An interface for our state
interface CartState {
  cart: [IProduct, number][];
}

// update localStorage with state for cart
export const updateLocalStorage = (state: CartState) => {
  setStorageItemAsync("cart", JSON.stringify(state.cart));
};

// Our reducer function that uses a switch statement to handle our actions
function cartReducer(state: CartState, action: CartAction) {
  const { type, payload } = action;
  let newState: [IProduct, number][];
  let id: string;

  switch (type) {
    case CartActionKind.ADD:
      id = payload.id;
      const existingProductIndex = state.cart.findIndex(
        (product) => product[0].id === id
      );

      if (existingProductIndex >= 0) {
        newState = state.cart.map(([product, quantity], index) =>
          index === existingProductIndex
            ? [product, quantity + 1]
            : [product, quantity]
        );
      } else {
        newState = [...state.cart, [payload, 1]];
      }

      updateLocalStorage({ cart: newState });
      return newState;

    case CartActionKind.REMOVE: //remove completly
      id = payload.id;
      newState = state.cart.filter((product) => product[0].id !== id);
      updateLocalStorage({ cart: newState });
      return newState;

    case CartActionKind.REDUCE: //remove 1 from item
      // reduce item by 1
      newState = state.cart.map((product) =>
        product[0].id === payload.id
          ? [product[0], product[1] - 1]
          : [product[0], product[1]]
      );

      newState = state.cart.filter((product) => product[1] === 0)

      updateLocalStorage({ cart: newState });
      return { cart: newState };

    case CartActionKind.CLEAR:
      updateLocalStorage({ cart: [] });
      return { cart: [] };

    default:
      return state;
  }
}
