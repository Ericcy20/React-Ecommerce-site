import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/CartSlice"; // Adjust naming for consistency
import wishlistReducer from "./Slices/WishListSlice";
import authReducer from "./Slices/authSlice";

const Store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
  },
});

export default Store;
