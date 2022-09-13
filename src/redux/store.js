import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import createSagaMiddleware from "@redux-saga/core";
import mainSaga from "./saga";

const sagaMW = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: () => [sagaMW],
});
sagaMW.run(mainSaga);

export default store;
