const func = ({ dispatch }) => (next) => async (action) => {
  if (typeof action === "function") return await action();
  next(action);
};
export default func;
