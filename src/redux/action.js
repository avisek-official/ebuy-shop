import { data } from "autoprefixer";
export const getCategories = () => {
  return {
    type: "GET_CATEGORIES",
    data,
  };
};
export const getAllProducts = () => {
  return {
    type: "GET_ALL_PRODUCTS",
    data,
  };
};
export const sortAllProductsLH = () => {
  return {
    type: "SORT_ALL_PRODUCTS_LH",
    data,
  };
};

export const sortAllProductsHL = () => {
  return {
    type: "SORT_ALL_PRODUCTS_HL",
    data,
  };
};

export const getProdDetails = (prod_id) => {
  return {
    type: "GET_PRODUCT_DETAILS",
    data: prod_id,
  };
};

export const userLogin = (userCredentials) => {
  return {
    type: "USER_LOGIN",
    data: userCredentials,
  };
};

export const userSignup = (userCredentials) => {
  return {
    type: "USER_SIGNUP",
    data: userCredentials,
  };
};

export const refreshUserAuth = (tokenData) => {
  return {
    type: "REF_USER_LOGIN",
    data: tokenData,
  };
};

export const logout = () => {
  return {
    type: "USER_LOGOUT",
    data,
  };
};

export const getUserInfo = () => {
  return {
    type: "GET_USER_INFO",
    data,
  };
};

export const updateUserInfo = (userData) => {
  return {
    type: "UPDATE_USERINFO",
    data: userData,
  };
};

export const updatePassword = (data) => {
  return {
    type: "UPDATE_USERPWD",
    data,
  };
};

export const addAddress = (data) => {
  return {
    type: "ADD_ADDRESS",
    data,
  };
};

export const deleteAddress = (data) => {
  return {
    type: "DELETE_ADDRESS",
    data,
  };
};

export const addToCart = (data) => {
  return {
    type: "ADD_TO_CART",
    data,
  };
};

export const removeFromCart = (data) => {
  return {
    type: "REMOVE_FROM_CART",
    data,
  };
};

export const updateCart = (data) => {
  return {
    type: "UPDATE_CART",
    data,
  };
};

export const placeOrder = (data) => {
  return {
    type: "PLACE_ORDER",
    data,
  };
};

export const cancelOrder = (data) => {
  return {
    type: "CANCEL_ORDER",
    data,
  };
};
