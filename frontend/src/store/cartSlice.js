import { createSlice } from "@reduxjs/toolkit";

// initialState = [{ id: String, quantity: Number }]

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart(state, action) {
      const existingItem = state.find(item => item.id === action.payload);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ id: action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      return state.filter(item => item.id !== action.payload);
    },
    clearCart(state) {
      state.length = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
