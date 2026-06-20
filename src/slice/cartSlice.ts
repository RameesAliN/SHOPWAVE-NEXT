import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductService from "@/services/product-services";
import CartService from "@/services/cart-services";


/* fetch cart from cart backend */
export let fetchCart = createAsyncThunk('cartSlice/fetchCart', async () => {
  const userId = CartService.getUserIdFromToken();
  const token = ProductService.getAccessToken();

  if (!userId || !token) {
    return [];
  }
  const response = await fetch(`${ProductService.SUPABASE_URL}/rest/v1/cart?select=*,products(*)&user_id=eq.${userId}`, {
    headers: {
      'apikey': ProductService.SUPABASE_KEY,
      'Authorization': `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    return [];
  }

  let data = await response.json();
  console.log(data);
  return data;
});


/* add to cart */
export const addToCart = createAsyncThunk('cartSlice/addToCart', async (products: any, { getState }: any) => {
  const { cart } = getState().getCart;

  const { token, userId } = await CartService.checkSession();     //check token

  /* check selected product already in cart */
  let existing = cart.find((item: any) => item.product_id === products.id);

  if (existing) {
    const response = await fetch(`${ProductService.SUPABASE_URL}/rest/v1/cart?id=eq.${existing.id}&select=*,products(*)`, {
      method: 'PATCH',
      headers: {
        'apikey': ProductService.SUPABASE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
        'Authorization': `Bearer ${token}`
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
      'Prefer': 'return=representation',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ product_id: products.id, quantity: 1, user_id: userId })
  });
  const data = await response.json();
  console.log('Added to cart:', data);
  return data;
})


/* clear cart */
export const clearCart = createAsyncThunk('cartSlice/clearCart', async () => {
  const userId = CartService.getUserIdFromToken();
  const token = ProductService.getAccessToken();

  if (!userId || !token) {
    return [];
  }

  const response = await fetch(
    `${ProductService.SUPABASE_URL}/rest/v1/cart?user_id=eq.${userId}`,
    {
      method: 'DELETE',
      headers: {
        'apikey': ProductService.SUPABASE_KEY,
        'Authorization': `Bearer ${token}`,
        'Prefer': 'return=representation'
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to clear cart');
  }

  const data = await response.json();
  return data;
});


/* incriment product quantity */
export const increaseQuantity = createAsyncThunk('cartSlice/increaseQuantity', async (cartprod: any) => {

  const { token } = await CartService.checkSession();   //check token

  const response = await fetch(`${ProductService.SUPABASE_URL}/rest/v1/cart?id=eq.${cartprod.id}&select=*,products(*)`, {
    method: 'PATCH',
    headers: {
      'apikey': ProductService.SUPABASE_KEY,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ quantity: cartprod.quantity + 1 })
  })

  if (!response.ok) {
    throw new Error('Failed to increase quantity');
  }

  const data = await response.json();
  return data;
});


/* decrease from cart quantity */
export const decreaseQuantity = createAsyncThunk('cartSlice/decreaseQuantity', async (cartprod: any) => {
  const { token } = await CartService.checkSession();

  // if quantity is 1, delete from cart
  if (cartprod.quantity === 1) {
    const response = await fetch(`${ProductService.SUPABASE_URL}/rest/v1/cart?id=eq.${cartprod.id}`, {
      method: 'DELETE',
      headers: {
        'apikey': ProductService.SUPABASE_KEY,
        'Authorization': `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error('Failed to remove item from cart');
    }

    return { deleted: true, id: cartprod.id };
  }

  // if quantity is above 1, decrease quantity
  const response = await fetch(`${ProductService.SUPABASE_URL}/rest/v1/cart?id=eq.${cartprod.id}&select=*,products(*)`, {
    method: 'PATCH',
    headers: {
      'apikey': ProductService.SUPABASE_KEY,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ quantity: cartprod.quantity - 1 })
  })

  if (!response.ok) {
    throw new Error('Failed to decrease quantity');
  }

  const data = await response.json();
  return data;
});


/* remove from cart */
export const removeFromCart = createAsyncThunk('cartSlice/removeFromCart', async (cartprod: any) => {
  const { token } = await CartService.checkSession(); // check token

  const response = await fetch(`${ProductService.SUPABASE_URL}/rest/v1/cart?id=eq.${cartprod.id}`, {
    method: 'DELETE',
    headers: {
      'apikey': ProductService.SUPABASE_KEY,
      'Authorization': `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    throw new Error('Failed to remove item from cart');
  }

  return cartprod.id;
});


/* cart slice */
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    totalItems: 0
  },
  reducers: {
    resetCart: (state, action) => {
      state.cart = [];
      state.totalItems = 0;
    }
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

    builder.addCase(increaseQuantity.fulfilled, (state: any, action: any) => {
      state.totalItems += 1;
      const updated = action.payload[0];
      const item = state.cart.find((i: any) => i.id === updated.id);
      if (item) {
        item.quantity += 1;
      }
    })

    builder.addCase(decreaseQuantity.fulfilled, (state: any, action: any) => {
      state.totalItems -= 1;
      if (action.payload && action.payload.deleted) {
        state.cart = state.cart.filter((i: any) => i.id !== action.payload.id);
        return
      }
      const updated = action.payload[0];
      const item = state.cart.find((i: any) => i.id === updated.id);
      if (item) {
        item.quantity -= 1;
      }
    })

    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.cart = state.cart.filter((i: any) => i.id !== action.payload);
      state.totalItems = state.cart.reduce((sum: number, i: any) => sum + i.quantity, 0);

    })
  }
})
export default cartSlice.reducer;
export const { resetCart } = cartSlice.actions;