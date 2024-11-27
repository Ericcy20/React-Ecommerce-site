// CartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      const item = action.payload;
      // Check if item already exists in the cart
      const existingItem = state.cart.find((i) => i.id === item.id);
      if (existingItem) {
        // If item exists, update the quantity
        existingItem.quantity += item.quantity;
      } else {
        // Otherwise, add the item to the cart
        state.cart.push(item);
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    ClearCart: (state) => {
      state.cart = [];
    },
    alltotal: (state) => {
      state.total = state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
});

export const {
  addtoCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  ClearCart,
  alltotal,
} = cartSlice.actions;

export default cartSlice.reducer;
