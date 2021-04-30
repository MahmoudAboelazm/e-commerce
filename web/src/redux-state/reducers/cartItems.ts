import { createSlice } from "@reduxjs/toolkit";
import { totalmem } from "node:os";

const cart = createSlice({
  name: "cart",
  initialState: { list: [], loading: false, total: 0 },
  reducers: {
    itemsReceived: (items, action) => {
      items.list = action.payload || [];
      items.loading = false;
    },
    addToCart: (items, action) => {
      const { productId, count } = action.payload;
      for (let item of items.list) {
        if (item.productId === productId) {
          item.count = count;
          items.loading = false;

          return;
        }
      }

      items.list.push(action.payload);
      items.loading = false;
    },
    deleteItem: (items, action) => {
      const { productId } = action.payload;
      items.list = items.list.filter(
        (item) => parseInt(item.productId) !== parseInt(productId),
      );
      items.loading = false;
    },
    updateItemQunatity: (items, action) => {
      const { productId, count } = action.payload;
      for (let item of items.list) {
        if (item.productId === productId) {
          item.count = count;
          items.loading = false;
          return;
        }
      }
    },
    total: (items, action) => {
      let t = 0;
      for (let item of items.list) {
        t += item.product.price * item.count;
      }
      items.total = t;
    },
    apiCall: (items, action) => {
      items.loading = true;
    },
  },
});
export const {
  itemsReceived,
  apiCall,
  addToCart,
  total,
  deleteItem,
  updateItemQunatity,
} = cart.actions;

export const loadCartItems = () =>
  apiCall({
    url: "/cart-items",
    onSucces: itemsReceived.type,
  });
export const totalsub = () => total({});

export const handleAddToCart = (data) =>
  apiCall({
    url: "/add-to-cart",
    onSucces: addToCart.type,
    method: "post",
    data,
  });
export const apiUpdateCartItem = (data) =>
  apiCall({
    url: "/update-cart-item",
    onSucces: updateItemQunatity.type,
    method: "post",
    data,
  });
export const deleteCartItem = (data) =>
  apiCall({
    url: "/delete-cart-item",
    onSucces: deleteItem.type,
    method: "delete",
    data,
  });

export default cart.reducer;
