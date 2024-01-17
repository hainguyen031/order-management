import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import orderReducer from "../features/orderSlice";

export const store = configureStore({
  reducer: {
    order: orderReducer,
  },
});
