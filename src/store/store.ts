import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../slice/productSlice'
import cartReducer from '../slice/cartSlice'
import loginSlice from '../slice/loginSlice'
import CheckoutReducer from '../slice/checkoutSlice'


const store = configureStore({
  reducer: {
    getProduct: productReducer,
    getCart: cartReducer,
    getLogin: loginSlice,
    getCheckout: CheckoutReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;