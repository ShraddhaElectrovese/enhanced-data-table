import { configureStore } from "@reduxjs/toolkit";
import dealerReducer from "../reducers/dealerReducer";

const store = configureStore({
  reducer: {
    dealer: dealerReducer,
  },
});

export default store;
