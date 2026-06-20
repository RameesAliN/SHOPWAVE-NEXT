"use client"
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/store/hooks'
import { fetchCart, resetCart } from '@/slice/cartSlice'
import { setLoginStatus } from '@/slice/loginSlice'
import ProductService from '@/services/product-services'
import CartService from '@/services/cart-services'

function TotalProduct() {
  const dispatch = useAppDispatch();
  const { totalItems, } = useSelector((state: any) => state.getCart);
  const { loginStatus } = useSelector((state: any) => state.getLogin);

  useEffect(() => {
    const userId = CartService.getUserIdFromToken();
    const token = ProductService.getAccessToken();
    if (!userId || !token) {
      localStorage.removeItem('access_token');
      localStorage.setItem('loginStatus', JSON.stringify('Login'));
      dispatch(setLoginStatus('Login'));
      dispatch(resetCart(''));
    }
  }, [])

  useEffect(() => {
    if (loginStatus === 'Logout') { // adjust to your actual "logged in" value
      dispatch(fetchCart());
    }
  }, [loginStatus]);

  return <span className='nav-cart-total'>{totalItems ? totalItems : ''}</span>
}

export default TotalProduct