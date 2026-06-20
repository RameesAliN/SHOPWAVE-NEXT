import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
   name: 'login',
  initialState: {
    loginStatus:'Login',
    email: '',
    password: '',
    success: '',
    error: '',
  },
  reducers:{
    setLoginStatus:(state,action)=>{
      state.loginStatus = action.payload;
    },
    setEmail:(state,action)=>{
      state.email=action.payload;
    },

    setPassword:(state,action)=>{
      state.password = action.payload;
    },
    setSuccess:(state,action)=>{
      state.success=action.payload;
    },
     setError:(state,action)=>{
      state.error=action.payload;
    },
  }
})
export default loginSlice.reducer;
export const {setEmail,setPassword,setSuccess,setError,setLoginStatus} = loginSlice.actions;
