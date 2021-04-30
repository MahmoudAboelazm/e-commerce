import axios from "axios";
import { total } from "../reducers/cartItems";
import { apiCall } from "../reducers/products";

const api = ({ dispatch }) => (next) => async (action) => {
  console.log(action.type);
  if (action.type && !action.type.includes(apiCall.type)) return next(action);

  const { url, method, data, onSucces, onError, headers } = action.payload;
  next(action);

  try {
    const response = await axios.request({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      url,
      method,
      headers,
      data,
      withCredentials: true,
    });

    dispatch({ type: onSucces, payload: response.data });
    if (action.type.includes("cart")) dispatch(total({}));
  } catch (err) {
    dispatch({ type: onError, payload: err.message });
  }
};
export default api;
