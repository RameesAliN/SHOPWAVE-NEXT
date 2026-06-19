"use client"
import React from 'react'
import Link from 'next/link'
import { useAppDispatch } from '@/store/hooks'
import { addToCart } from '@/slice/cartSlice'

function AddToCartButton({product}:any) {
  // const product=props.product;
  const dispatch = useAppDispatch();

  return  <div className="d-flex justify-content-center">
            <Link href='/cart'>
              <button type="button" className="btn btn-outline-dark mt-3" style={{ fontSize: '1.4vw' }} onClick={()=>{dispatch(addToCart(product))}} >
                Add To Cart
              </button>
            </Link>
          </div>
}

export default AddToCartButton
