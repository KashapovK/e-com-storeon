import { createStoreon } from "storeon";
import { StoreState, StoreEvents } from "./types/types";

const store = createStoreon<StoreState, StoreEvents>([
  (store) => {
    store.on("@init", () => ({
      products: [],
      cart: [],
    }));

    store.on("products/set", (state, products) => ({
      ...state,
      products,
    }));

    store.on("cart/add", (state, product) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    });

    store.on("cart/remove", (state, id) => ({
      ...state,
      cart: state.cart.filter((item) => item.id !== id),
    }));

    store.on("cart/increase", (state, id) => ({
      ...state,
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    }));

    store.on("cart/decrease", (state, id) => ({
      ...state,
      cart: state.cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    }));
  },
]);

export default store;
