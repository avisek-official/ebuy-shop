export const productReducer = (data = [], action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return action.data;
    default:
      return data;
  }
};

export const allProductReducer = (data = [], action) => {
  switch (action.type) {
    case "SET_ALL_PRODUCTS":
      data = action.data;
      return data;
    case "SET_SORT_PRODUCTS_LH":
      data = action.data;
      return data;
    case "SET_SORT_PRODUCTS_HL":
      data = action.data;
      return data;
    default:
      return data;
  }
};

export const productDetailsReducer = (data = [], action) => {
  switch (action.type) {
    case "SET_PRODUCT_DETAILS":
      return action.data;
    default:
      return data;
  }
};

export const LoginReducer = (data = [], action) => {
  switch (action.type) {
    case "SET_USER_LOGIN":
      data = action.data;
      //console.log(data);
      return data;
    case "REFRESH_USER_LOGIN":
      data = action.data;
      return data;
    case "SET_USER_SIGNUP":
      data = action.data;
      return data;
    case "USER_LOGOUT":
      data = [];
      //console.log(data);
      return data;
    default:
      return data;
  }
};

export const UserDataReducer = (data = [], action) => {
  switch (action.type) {
    case "SET_USER_INFO":
      data = action.data;
      //console.log(data);
      return data;
    default:
      return data;
  }
};

export const UpdatePasswordReducer = (data = [], action) => {
  switch (action.type) {
    case "UPDATE_USER_PWD":
      data = action.data;
      return data;
    default:
      return data;
  }
};
