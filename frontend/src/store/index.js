import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

const reduxStore = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export default reduxStore;
