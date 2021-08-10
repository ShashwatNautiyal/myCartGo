export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const INCREMENT_QUANTITY = "INCREMENT_QUANTITY";
export const DECREMENT_QUANTITY = "DECREMENT_QUANTITY";
export const PRICE_FILTER = "PRICE_FILTER";
export const CATEGORY_FILTER = "CATEGORY_FILTER";
export const RANGE_FILTER = "RANGE_FILTER";

export const setProducts = (products) => {
   return {
      type: SET_PRODUCTS,
      payload: products,
   };
};

export const addToCart = (product) => {
   return {
      type: ADD_TO_CART,
      payload: product,
   };
};

export const removeFromCart = (productId) => {
   return {
      type: REMOVE_FROM_CART,
      payload: productId,
   };
};

export const incrementQuantity = (productId) => {
   return {
      type: INCREMENT_QUANTITY,
      payload: productId,
   };
};

export const decrementQuantity = (productId) => {
   return {
      type: DECREMENT_QUANTITY,
      payload: productId,
   };
};

export const priceFilter = (value) => {
   return {
      type: PRICE_FILTER,
      payload: value,
   };
};

export const categoryFilter = (value) => {
   return {
      type: CATEGORY_FILTER,
      payload: value,
   };
};

export const rangeFilter = (value) => {
   return {
      type: RANGE_FILTER,
      payload: value,
   };
};
