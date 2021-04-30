import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import cart from "./reducers/cartItems";
import api from "./middleware/api";
import products from "./reducers/products";

let middleware = [thunk, api];
export const rootReducer = combineReducers({
  products,
  cart,
});

const makeStore = () => {
  const composeEnhancers =
    process.env.NODE_ENV !== "production" ? composeWithDevTools : compose;

  return createStore(
    rootReducer,

    composeEnhancers(applyMiddleware(...middleware) as any),
  );
};

export default createWrapper(makeStore, { debug: true });
