import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

const API_URL =
  "https://ebuy-ecomm-default-rtdb.asia-southeast1.firebasedatabase.app";

function* getCategories() {
  try {
    let data = yield axios.get(`${API_URL}/categories.json`);
    data = yield data["data"];
    yield put({ type: "SET_CATEGORIES", data });
  } catch (error) {
    console.error(error);
  }
}

function* getAllProducts() {
  try {
    let data = yield axios.get(`${API_URL}/products.json`);
    data = yield data["data"];
    yield put({ type: "SET_ALL_PRODUCTS", data });
  } catch (error) {
    console.error(error);
  }
}

function* sortAllProductsLH() {
  try {
    let data = yield axios.get(`${API_URL}/products.json`);
    data = yield data["data"];
    data.sort((a, b) => a.price - b.price);
    yield put({ type: "SET_SORT_PRODUCTS_LH", data });
  } catch (error) {
    console.error(error);
  }
}

function* sortAllProductsHL() {
  try {
    let data = yield axios.get(`${API_URL}/products.json`);
    data = yield data["data"];
    data.sort((a, b) => b.price - a.price);
    yield put({ type: "SET_SORT_PRODUCTS_HL", data });
  } catch (error) {
    console.error(error);
  }
}

function* getProdDetails(action) {
  try {
    yield put({ type: "SET_PRODUCT_DETAILS", data: "loading" });
    let data = yield axios.get(`${API_URL}/products/${action.data}.json`);
    data = yield data["data"];
    yield put({ type: "SET_PRODUCT_DETAILS", data });
  } catch (error) {
    console.error(error);
  }
}

function* userLogin(action) {
  try {
    yield put({ type: "SET_USER_LOGIN", data: ["loading"] });
    const email = action.data.email;
    const password = action.data.password;
    let data = yield axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]`,
      { email: email, password: password, returnSecureToken: true }
    );
    let loggedUserCart = [];
    if (data.status === 200) {
      let newdata = yield axios.get(`${API_URL}/users.json`);
      yield (newdata = newdata["data"]);

      for (const key in newdata) {
        if (newdata[key].email === email) {
          loggedUserCart.push({
            cartItems: newdata[key].cartItems,
            userId: key,
          });
        }
      }
      data = { ...data, cartData: loggedUserCart[0] };
    }
    yield put({ type: "SET_USER_LOGIN", data: data });
  } catch (error) {
    yield put({
      type: "SET_USER_LOGIN",
      data: error.response.data.error,
    });
  }
}

function* userSignup(action) {
  try {
    yield put({ type: "SET_USER_SIGNUP", data: ["loading"] });
    const email = action.data.email;
    const password = action.data.password;
    let data = yield axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]`,
      { email: email, password: password, returnSecureToken: true }
    );

    if (yield data.status === 200) {
      const userInfo = {
        email: email,
        fullName: "User",
        address: "",
        cartItems: { 0: "" },
        orderHistory: "",
      };
      let addUser = yield axios.post(`${API_URL}/users.json`, userInfo);
      if (yield addUser.status === 200) {
        yield put({ type: "SET_USER_SIGNUP", data });
      }
    }
  } catch (error) {
    yield put({
      type: "SET_USER_SIGNUP",
      data: error.response.data.error,
    });
  }
}

function* refreshUserAuth(action) {
  try {
    yield put({ type: "REFRESH_USER_LOGIN", data: ["loading"] });
    const idToken = action.data.idToken;
    let data = yield axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]`,
      { idToken }
    );
    //yield (data = data["data"]);
    yield put({ type: "REFRESH_USER_LOGIN", data });
  } catch (error) {
    yield put({ type: "REFRESH_USER_LOGIN", data: "error" });
  }
}

function* userInfo(action) {
  try {
    yield put({ type: "SET_USER_INFO", data: "loading" });
    //const email = action.data.email;
    let data = yield axios.get(`${API_URL}/users.json`);
    yield (data = data["data"]);

    yield put({ type: "SET_USER_INFO", data });
  } catch (error) {
    yield put({ type: "SET_USER_INFO", data: "error" });
  }
}

function* updateUserInfo(action) {
  try {
    yield put({ type: "SET_USER_INFO", data: "loading" });
    const id = action.data.id;
    let data = yield axios.put(`${API_URL}/users/${id}.json`, {
      ...action.data,
    });
    //yield (data = data["data"]);
    if (yield data["data"].id === id) {
      let newdata = yield axios.get(`${API_URL}/users.json`);
      yield (newdata = newdata["data"]);

      yield put({ type: "SET_USER_INFO", data: newdata });
    }
    //yield put({ type: "SET_USER_INFO", data: data.id });
  } catch (error) {
    yield put({ type: "SET_USER_INFO", data: "error" });
  }
}

function* updatePassword(action) {
  try {
    yield put({ type: "UPDATE_USER_PWD", data: "loading" });
    let data = yield axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API_KEY]`,
      {
        idToken: action.data.idToken,
        password: action.data.password,
        returnSecureToken: false,
      }
    );
    yield put({ type: "UPDATE_USER_PWD", data });
  } catch (error) {
    yield put({ type: "UPDATE_USER_PWD", data: "error" });
  }
}

function* addAddress(action) {
  const address = action.data.address;
  const userId = action.data.userId;
  try {
    yield put({ type: "SET_USER_INFO", data: "loading" });

    let data = yield axios.post(`${API_URL}/users/${userId}/address.json`, {
      ...address,
    });
    yield (data = data["data"]);
    let newdata = yield axios.get(`${API_URL}/users.json`);
    yield (newdata = newdata["data"]);
    yield put({ type: "SET_USER_INFO", data: newdata });
  } catch (error) {
    yield put({ type: "SET_USER_INFO", data: "error" });
  }
}

function* addToCart(action) {
  const item = action.data.item;
  const userId = action.data.userId;
  try {
    yield put({ type: "SET_USER_INFO", data: "loading" });

    let data = yield axios.post(`${API_URL}/users/${userId}/cartItems.json`, {
      ...item,
    });
    yield (data = data["data"]);
    let newdata = yield axios.get(`${API_URL}/users.json`);
    yield (newdata = newdata["data"]);
    yield put({ type: "SET_USER_INFO", data: newdata });
  } catch (error) {
    yield put({ type: "SET_USER_INFO", data: "error" });
  }
}
function* removeFromCart(action) {
  const cartItemKey = action.data.cartItemKey;
  const userId = action.data.userId;
  try {
    yield put({ type: "SET_USER_INFO", data: "loading" });

    let data = yield axios.delete(
      `${API_URL}/users/${userId}/cartItems/${cartItemKey}.json`
    );
    yield (data = data["data"]);
    let newdata = yield axios.get(`${API_URL}/users.json`);
    yield (newdata = newdata["data"]);
    yield put({ type: "SET_USER_INFO", data: newdata });
  } catch (error) {
    yield put({ type: "SET_USER_INFO", data: "error" });
  }
}

function* updateCart(action) {
  const cartItemKey = action.data.cartItemKey;
  const userId = action.data.userId;
  const cartItemData = action.data.cartItemData;
  try {
    yield put({ type: "SET_USER_INFO", data: "loading" });

    let data = yield axios.put(
      `${API_URL}/users/${userId}/cartItems/${cartItemKey}.json`,
      cartItemData
    );
    yield (data = data["data"]);
    let newdata = yield axios.get(`${API_URL}/users.json`);
    yield (newdata = newdata["data"]);
    yield put({ type: "SET_USER_INFO", data: newdata });
  } catch (error) {
    yield put({ type: "SET_USER_INFO", data: "error" });
  }
}

function* deleteAddress(action) {
  const addId = action.data.addId;
  const userId = action.data.userId;
  try {
    yield put({ type: "SET_USER_INFO", data: "loading" });
    let data = yield axios.delete(
      `${API_URL}/users/${userId}/address/${addId}.json`
    );
    if (data.status === 200) {
      let newdata = yield axios.get(`${API_URL}/users.json`);
      yield (newdata = newdata["data"]);
      yield put({ type: "SET_USER_INFO", data: newdata });
    }
  } catch (error) {
    yield put({ type: "SET_USER_INFO", data: "error" });
  }
}

function* placeOrder(action) {
  const orderDetails = action.data.orderDetails;
  const userId = action.data.userId;
  try {
    yield put({ type: "SET_USER_INFO", data: "loading" });

    let data = yield axios.post(
      `${API_URL}/users/${userId}/orderHistory.json`,
      {
        ...orderDetails,
      }
    );
    yield (data = data["data"]);
    let newdata = yield axios.get(`${API_URL}/users.json`);
    yield (newdata = newdata["data"]);
    yield put({ type: "SET_USER_INFO", data: newdata });
  } catch (error) {
    yield put({ type: "SET_USER_INFO", data: "error" });
  }
}

function* cancelOrder(action) {
  const orderId = action.data.orderId;
  const userId = action.data.userId;
  const updatedOrderDetails = action.data.updatedOrderDetails;
  try {
    yield put({ type: "SET_USER_INFO", data: "loading" });

    let data = yield axios.put(
      `${API_URL}/users/${userId}/orderHistory/${orderId}.json`,
      { ...updatedOrderDetails }
    );

    yield (data = data["data"]);
    let newdata = yield axios.get(`${API_URL}/users.json`);
    yield (newdata = newdata["data"]);
    yield put({ type: "SET_USER_INFO", data: newdata });
  } catch (error) {
    yield put({ type: "SET_USER_INFO", data: "error" });
  }
}

function* mainSaga() {
  yield takeEvery("GET_CATEGORIES", getCategories);
  yield takeEvery("GET_ALL_PRODUCTS", getAllProducts);
  yield takeEvery("SORT_ALL_PRODUCTS_LH", sortAllProductsLH);
  yield takeEvery("SORT_ALL_PRODUCTS_HL", sortAllProductsHL);
  yield takeEvery("GET_PRODUCT_DETAILS", getProdDetails);
  yield takeEvery("USER_LOGIN", userLogin);
  yield takeEvery("REF_USER_LOGIN", refreshUserAuth);
  yield takeEvery("USER_SIGNUP", userSignup);
  yield takeEvery("GET_USER_INFO", userInfo);
  yield takeEvery("UPDATE_USERINFO", updateUserInfo);
  yield takeEvery("UPDATE_USERPWD", updatePassword);
  yield takeEvery("ADD_ADDRESS", addAddress);
  yield takeEvery("DELETE_ADDRESS", deleteAddress);
  yield takeEvery("ADD_TO_CART", addToCart);
  yield takeEvery("REMOVE_FROM_CART", removeFromCart);
  yield takeEvery("UPDATE_CART", updateCart);
  yield takeEvery("PLACE_ORDER", placeOrder);
  yield takeEvery("CANCEL_ORDER", cancelOrder);
}
export default mainSaga;
