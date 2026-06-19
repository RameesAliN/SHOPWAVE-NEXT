"use client"
import React from 'react'
import Link from 'next/link'

function AddToCartButton() {
  return  <div className="d-flex justify-content-center">
            <Link href='/cart'>
              <button type="button" className="btn btn-outline-dark mt-3" style={{ fontSize: '1.4vw' }}  >
                Add To Cart
              </button>
            </Link>
          </div>
}

export default AddToCartButton
