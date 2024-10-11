import { createSlice } from "@reduxjs/toolkit";

// initialState = [{ id: String, quantity: Number }]
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart({ items }, action) {
      const existingItem = items.find(item => item.id === action.payload);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        items.push({ id: action.payload, quantity: 1 });
      }
    },
    decrementFromCart({ items }, action) {
      const existingItem = items.find(item => item.id === action.payload);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        const indexToRemove = items.indexOf(existingItem);
        if (indexToRemove !== -1) items.splice(indexToRemove, 1);
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart({ items }) {
      items.length = 0;
    },
  },
});

export const { addToCart, removeFromCart, decrementFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
