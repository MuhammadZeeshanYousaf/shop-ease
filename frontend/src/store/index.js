import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartSlice from "./cartSlice";

const persistedCart = persistReducer({ key: "root", version: 1, storage }, cartSlice);

const reduxStore = configureStore({
  reducer: {
    cart: persistedCart,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const storePersistor = persistStore(reduxStore);

export { reduxStore, storePersistor };
