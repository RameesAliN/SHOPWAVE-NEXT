import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductService from "@/services/product-services";

/* fetch cart from cart backend */
export let fetchCart = createAsyncThunk('cartSlice/fetchCart', async () => {

  const response = await fetch(`${ProductService.SUPABASE_URL}/rest/v1/cart?select=*,products(*)`, {
    headers: {
      'apikey': ProductService.SUPABASE_KEY,
    }
  });
  let data = await response.json();
  console.log(data);
  return data;
});


export const addToCart = createAsyncThunk('cartSlice/addToCart', async (products: any, { getState }: any) => {
  const { cart } = getState().getCart;

  /* check selected product already in cart */
  let existing = cart.find((item: any) => item.product_id === products.id);

  if (existing) {
    const response = await fetch(`${ProductService.SUPABASE_URL}/rest/v1/cart?id=eq.${existing.id}&select=*,products(*)`, {
      method: 'PATCH',
      headers: {
        'apikey': ProductService.SUPABASE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({ quantity: existing.quantity + 1 })
    })
    const data = await response.json();
    return data
  }

  const response = await fetch(`${ProductService.SUPABASE_URL}/rest/v1/cart?select=*,products(*)`, {
    method: 'POST',
    headers: {
      'apikey': ProductService.SUPABASE_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ product_id: products.id, quantity: 1 })
  });
  const data = await response.json();
  console.log('Added to cart:', data);
  return data;
})


/* clear cart */
export const clearCart = createAsyncThunk('cartSlice/clearCart', async () => {
  const response = await fetch(`${ProductService.SUPABASE_URL}/rest/v1/cart?id=gt.0`, {
    method: 'DELETE',
    headers: {
      'apikey': ProductService.SUPABASE_KEY,
      'Prefer': 'return=representation'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to clear cart');
  }

  const data = await response.json();
  return data;
});


/* incriment product quantity */
export const increaseQuantity = createAsyncThunk('cartSlice/increaseQuantity', async (cartprod:any) => {

  let response = await fetch(`${ProductService.SUPABASE_URL}/rest/v1/cart?id=eq.${cartprod.id}&select=*,products(*)`, {
    method: 'PATCH',
    headers: {
      'apikey': ProductService.SUPABASE_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ quantity: cartprod.quantity + 1 })
  })
  let data = await response.json();
  return data;
});

/* decrease from cart quantity */
export const decreaseQuantity = createAsyncThunk('cartSlice/decreaseQuantity', async (cartprod:any) => {

  // if quantity is 1, delete from cart
  if (cartprod.quantity === 1) {
    await fetch(`${ProductService.SUPABASE_URL}/rest/v1/cart?id=eq.${cartprod.id}`, {
      method: 'DELETE',
      headers: {
        'apikey': ProductService.SUPABASE_KEY,
      }
    });
    return { deleted: true, id: cartprod.id };
  }

  // if quantity is above 1 , delet from cart
  let response = await fetch(`${ProductService.SUPABASE_URL}/rest/v1/cart?id=eq.${cartprod.id}`, {
    method: 'PATCH',
    headers: {
      'apikey': ProductService.SUPABASE_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ quantity: cartprod.quantity - 1 })
  })
  let data = await response.json();
  return data;
});

/* remove from cart */
export const removeFromCart = createAsyncThunk('cartSlice/removeFromCart', async (cartprod:any) => {
  
  const response = await fetch(`${ProductService.SUPABASE_URL}/rest/v1/cart?id=eq.${cartprod.id}`, {
    method: 'DELETE',
    headers: {
      'apikey': ProductService.SUPABASE_KEY,
    }
  });
  return cartprod.id
});


/* cart slice */
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    totalItems: 0
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.totalItems = state.cart.reduce((sum: number, i: any) => sum + i.quantity, 0);
    })

    builder.addCase(addToCart.fulfilled, (state: any, action: any) => {
      state.totalItems += 1;
      const updatedItem = action.payload[0];
      const index = state.cart.findIndex((item: any) => item.id === updatedItem.id);

      if (index !== -1) {
        // already in cart locally — replace with updated version (new quantity)
        state.cart[index] = updatedItem;
      } else {
        // genuinely new — add it
        state.cart.push(updatedItem);
      }
    })

    builder.addCase(clearCart.fulfilled, (state, action) => {
      state.totalItems = 0;
      state.cart = [];
    })

     builder.addCase(increaseQuantity.fulfilled, (state:any, action:any) => {
      state.totalItems += 1;
      const updated = action.payload[0];
      const item = state.cart.find((i:any) => i.id === updated.id);
      if (item) {
        item.quantity += 1;
      }
    })

    builder.addCase(decreaseQuantity.fulfilled, (state:any, action:any) => {
      state.totalItems -= 1;
      if (action.payload && action.payload.deleted) {
        state.cart = state.cart.filter((i:any) => i.id !== action.payload.id);
        return
      }
      const updated = action.payload[0];
      const item = state.cart.find((i:any) => i.id === updated.id);
      if (item) {
        item.quantity -= 1;
      }
    })

    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.cart = state.cart.filter((i:any) => i.id !== action.payload);
      state.totalItems = state.cart.reduce((sum: number, i: any) => sum + i.quantity, 0);
      
    })
  }
})
export default cartSlice.reducer;