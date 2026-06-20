import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearCart } from "./cartSlice";
import CartService from "@/services/cart-services"
import ProductService from "@/services/product-services";




/* place order */
export const placeOrder = createAsyncThunk('cartSlice/placeOrder', async ({ total, address }: any, { getState, dispatch }: any) => {
  const { userId, token } = await CartService.checkSession();
  const { cart } = getState().getCart;

  const response = await fetch(`${ProductService.SUPABASE_URL}/rest/v1/orders`, {
    method: 'POST',
    headers: {
      'apikey': ProductService.SUPABASE_KEY,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({
      user_id: userId,
      items: cart,
      total: total,
      status: 'pending',
      address: address
    })
  });

  if (!response.ok) {
    throw new Error('Failed to place order');
  }

  const data = await response.json();
  dispatch(clearCart()); // clear cart after order placed
  return data;
});


/* save default address */
export const setDefaultAddress = createAsyncThunk('checkoutSlice/setDefaultAddress', async (address:any) => {
  const { userId, token } = await CartService.checkSession();

  //check already exist
  const check = await fetch(`${ProductService.SUPABASE_URL}/rest/v1/address?user_id=eq.${userId}`, {
    headers: {
      'apikey': ProductService.SUPABASE_KEY,
      'Authorization': `Bearer ${token}`,
    }
  });
  const existing = await check.json();
  //if exist
  if (existing.length > 0) {
    const response = await fetch(`${ProductService.SUPABASE_URL}/rest/v1/address?user_id=eq.${userId}`, {
      method: 'PATCH',
      headers: {
        'apikey': ProductService.SUPABASE_KEY,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        full_name: address.fullName,
        phone: address.phone,
        address: address.address,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        is_default: true,
      })
    });
    const data = await response.json();
    return data[0];
  } else {
    //if not exist
    const response = await fetch(`${ProductService.SUPABASE_URL}/rest/v1/address`, {
      method: 'POST',
      headers: {
        'apikey': ProductService.SUPABASE_KEY,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        user_id: userId,
        full_name: address.fullName,
        phone: address.phone,
        address: address.address,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        is_default: true,
      })
    });
    const data = await response.json();
    return data[0];
  }


});


/* load default address */
export const loadDefaultAddress = createAsyncThunk('checkoutSlice/loadDefaultAddress', async () => {
  const { userId, token } = await CartService.checkSession();

  let response = await fetch(`${ProductService.SUPABASE_URL}/rest/v1/address?user_id=eq.${userId}`, {
    method: 'GET',
    headers: {
      'apikey': ProductService.SUPABASE_KEY,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
  })
  let data = await response.json();
  return data;
})


const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    address: {
      fullName: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: ''
    }
  },
  reducers: {
    setAddress: (state:any, action) => {
      const { name, value } = action.payload;
      state.address[name] = value;
    }

  },
  extraReducers: (builder) => {

    builder.addCase(loadDefaultAddress.fulfilled, (state, action) => {
      if (action.payload.length > 0) {
        state.address.fullName = action.payload[0].full_name;
        state.address.phone = action.payload[0].phone;
        state.address.address = action.payload[0].address;
        state.address.city = action.payload[0].city;
        state.address.state = action.payload[0].state;
        state.address.pincode = action.payload[0].pincode;
      }
    })
  }

});
export const { setAddress } = checkoutSlice.actions;
export default checkoutSlice.reducer;