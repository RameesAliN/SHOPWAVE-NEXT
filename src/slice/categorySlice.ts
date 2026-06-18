import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name:"category",
  initialState:{isActiveFilter:'ALL'},
  reducers:{
    setActiveState:(state,action)=>{
      state.isActiveFilter=action.payload;
    }
  }
})
export const {setActiveState} = categorySlice.actions;
export default categorySlice.reducer;