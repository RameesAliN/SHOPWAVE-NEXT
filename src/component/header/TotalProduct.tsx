"use client"
import React from 'react'
import { useSelector } from 'react-redux'

function TotalProduct() {
  const {totalItems}=useSelector((state:any)=>state.getCart)
  return <span className='nav-cart-total'>{totalItems? totalItems:''}</span>
}

export default TotalProduct
