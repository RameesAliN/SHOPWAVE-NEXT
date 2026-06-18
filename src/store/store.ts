import { configureStore } from "@reduxjs/toolkit";
import catrgoryReducer from '../slice/categorySlice'

const store=configureStore({
  reducer:{
    getCategory:catrgoryReducer
  }
});
export default store;