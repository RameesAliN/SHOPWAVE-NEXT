import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../slice/productSlice'

const store=configureStore({
  reducer:{
    getProduct:productReducer
  }
});
export default store;