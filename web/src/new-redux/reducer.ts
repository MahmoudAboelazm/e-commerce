import { HYDRATE } from "next-redux-wrapper";

// constants
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

// actions
export const increment = (isServer) => {
  return (dispatch) => {
    dispatch({
      type: INCREMENT,
      from: isServer ? "server" : "client",
    });
  };
};

export const decrement = (isServer) => {
  return (dispatch) => {
    dispatch({
      type: DECREMENT,
      from: isServer ? "server" : "client",
    });
  };
};

// state
export const initialState = {
  value: 0,
  action: null,
  from: null,
};

//reducer
export const counter = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };

    case INCREMENT:
      return {
        ...state,
        value: state.value + 1,
        action: "increment",
        from: action.from,
      };

    case DECREMENT:
      return {
        ...state,
        value: state.value - 1,
        action: "decrement",
        from: action.from,
      };

    default:
      return { ...state };
  }
};
