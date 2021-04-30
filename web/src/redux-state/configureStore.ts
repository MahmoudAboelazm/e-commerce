import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
  AnyAction,
} from "@reduxjs/toolkit";
import { Context, createWrapper, MakeStore } from "next-redux-wrapper";
import produdcts, { loadProducts } from "./products";
import cartReducer from "./cartItems";
import api from "./middleware/api";

export interface State {
  products: { list: any[]; loading: string };
  cart: any[];
}

const makeStore = (preloadedState = {}) =>
  configureStore({
    reducer: combineReducers({
      produdcts,
      cartReducer,
    }),
    // preloadedState: { ...statess, ...preloadedState },
    middleware: [...getDefaultMiddleware()],
  });

export const wrapper = createWrapper(makeStore, { debug: true });
