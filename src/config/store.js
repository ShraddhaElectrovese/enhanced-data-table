import { configureStore } from "@reduxjs/toolkit";
import dealerReducer from "../reducers/dealerReducer";
import authReducer from "../reducers/Auth.reducer";

const store = configureStore({
  reducer: {
    dealer: dealerReducer,
    auth: authReducer,
  },
});

export default store;
