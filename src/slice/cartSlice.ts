import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductService from "@/services/product-services";

export const addToCart = createAsyncThunk('cartSlice/addToCart',async(products:any)=>{
  const response = await fetch(`${ProductService.SUPABASE_URL}/rest/v1/cart`, {
    method: 'POST',
    headers: {
      'apikey': ProductService.SUPABASE_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ product_id: products.id, quantity: 1})
  });
  const data = await response.json();
  console.log('Added to cart:', data);
  return data;
})

const cartSlice=createSlice({
  name:'cart',
  initialState:{cart:[]},
  reducers:{

  },
  extraReducers:(builder)=>{
    builder.addCase(addToCart.fulfilled,(state:any,action:any)=>{
      state.cart.push(action.payload[0])
    })
  }
})
export default cartSlice.reducer;