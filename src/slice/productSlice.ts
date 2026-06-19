import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    isActiveFilter: 'ALL',
    userInput:''
  },

  reducers: {
    setActiveFilter: (state, action) => {
      state.isActiveFilter = action.payload;
    },
    setUserInput:(state,action)=>{
      state.userInput = action.payload;
    }
  }
})
export const { setActiveFilter,setUserInput } = productSlice.actions;
export default productSlice.reducer;