import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../slice/productSlice'
import cartReducer from '../slice/cartSlice'

const store = configureStore({
  reducer: {
    getProduct: productReducer,
    getCart: cartReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;