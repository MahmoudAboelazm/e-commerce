import { createAction, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";

const hydrate = createAction(HYDRATE);

export const apiCall = createAction("apiCall", (payload) => ({ payload }));
export const productsRecived = createAction("productsRecived");
export const apiFailer = createAction("apiFailer");
const apiSSRCall = createAction("apiSSRCall", (payload) => ({ payload }));

const products = {
  list: [],
  loading: false,
  pagesCount: 0,
  currentPage: 1,
  productsQuantity: 8,
  genre: null,
  category: null,
  orderByPrice: null,
};

const productsReducer = createReducer(products, {
  [hydrate.type]: (state, action) => {
    return { ...state, ...action.payload.products };
  },

  [apiCall.type]: (products, action) => {
    products.loading = true;
    console.log("api start");
  },

  [productsRecived.type]: (products, action) => {
    products.list = action.payload.products;
    products.loading = false;
    console.log("api end");
  },

  [apiSSRCall.type]: (products, action) => {
    products.list = action.payload.products;
    products.pagesCount = Math.ceil(
      action.payload.productCount / products.productsQuantity,
    );
    products.currentPage = action.payload.pageId;
    products.category = action.payload.category;
    products.genre = action.payload.genre;
    products.orderByPrice = action.payload.orderByPrice || null;
    console.log("api ssr");
  },

  [apiFailer.type]: (products, action) => {
    console.log(action.payload);
  },
});
class FetchingData {
  pageId?: number | null;
  category?: string | null;
  genre?: string | null;
  orderByPrice?: string | null;
}

export const loadSSRProducts = async ({
  pageId,
  genre,
  category,
  orderByPrice,
}: FetchingData) => {
  const response = await axios.request({
    baseURL: "http://localhost:4000/",
    url: "/products",
    method: "patch",
    data: {
      pageNumber: pageId,
      productsQuantity: products.productsQuantity,
      genre,
      category,
      orderByPrice,
    },
  });

  return apiSSRCall({
    products: response.data.products,
    productCount: response.data.productCount,
    pageId,
    category,
    genre,
    orderByPrice,
  });
};

export const loadProducts = (data) => {
  return apiCall({
    url: "/products",
    onSucces: productsRecived.type,
    method: "patch",
    onError: apiFailer.type,
    data,
  });
};

export default productsReducer;
