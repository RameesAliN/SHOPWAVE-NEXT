"use client"
import React from 'react'
import Link from 'next/link'
import { useAppDispatch } from '@/store/hooks'
import { addToCart, resetCart } from '@/slice/cartSlice'
import { setLoginStatus } from '@/slice/loginSlice'
import ProductService from '@/services/product-services'
import CartService from '@/services/cart-services'
import { useRouter } from 'next/navigation'

function AddToCartButton({ product }: any) {
  // const product=props.product;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAddToCart = async () => {
    try {
      await dispatch(addToCart(product)).unwrap(); //"unwrap()" make jump to catch if async thumb throw error
      router.push('/cart');

    } catch (error: any) {
      if (error.message === 'Session expired' || error.message === 'User not logged in') {
        // clean up session
        localStorage.removeItem('access_token');

        // reset Redux state if token problem
        dispatch(resetCart(''));
        dispatch(setLoginStatus('Login'));

        // redirect to login
        router.push('/login');
      }
    }
  };


  return <div className="d-flex justify-content-center">

    <button type="button" className="btn btn-outline-dark mt-3" style={{ fontSize: '1.4vw' }} onClick={handleAddToCart}> Add To Cart </button>

  </div>
}

export default AddToCartButton
