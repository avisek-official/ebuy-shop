import { combineReducers } from "redux";
import { productReducer } from "./reducer";
import {
  allProductReducer,
  productDetailsReducer,
  LoginReducer,
  UserDataReducer,
  UpdatePasswordReducer,
} from "./reducer";

export const rootReducer = combineReducers({
  productReducer,
  allProductReducer,
  productDetailsReducer,
  LoginReducer,
  UserDataReducer,
  UpdatePasswordReducer,
});
