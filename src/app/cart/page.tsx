"use client"
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Link from 'next/link'
import ProductService from '@/services/product-services';
import CartService from '@/services/cart-services';
import { useAppDispatch } from '@/store/hooks';
import { fetchCart, clearCart, increaseQuantity, decreaseQuantity, removeFromCart, resetCart } from '@/slice/cartSlice';
import { setLoginStatus } from '@/slice/loginSlice';
import '../../style/Cart.css'
import { useRouter } from 'next/navigation';


function Cart() {
  let subTotals: any = 0;
  let taxs: any = 0;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { cart, totalItems } = useSelector((state: any) => state.getCart);

   const handleCartAction = async (action: any) => {      //handler function for actions
    try {
      await dispatch(action).unwrap();
    } catch (error: any) {
      if (error.message === 'Session expired' || error.message === 'User not logged in') {
        localStorage.removeItem('access_token');
        localStorage.setItem('loginStatus', JSON.stringify('Login'));

        dispatch(resetCart(''));
        dispatch(setLoginStatus('Login'));

        router.push('/login');
      } else {
        alert('Something went wrong, please try again.');
      }
    }
  };

  useEffect(() => { dispatch(fetchCart()); }, []);
  return <>
    <div className="cart-page">

      <div className="cart-title">
        <div className="container">
          <h1 >Your Cart</h1>
          <p>{totalItems} items</p>
        </div>
      </div>

      <div className="row cart-layout">

        <div className="col-7 cart-product-summary">

          <div className="cart-product-title">
            <div className="title-product">PRODUCT</div>
            <div className="title-price">PRICE</div>
            <div className="title-quantity">QUANTITY</div>
            <div className="title-total">TOTAL</div>
          </div>

          {cart.map((cartprod: any) => {
            const product = cartprod.products;
            subTotals = ProductService.subTotal(cartprod.quantity, product.price, subTotals)
            return <div className="cart-product-items" key={cartprod.id}>
              <div className="cart-product-item">
                <img className="cart-product-image" src={product.image}></img>
                <div>
                  <p className="cart-product-category">{product.category.toUpperCase()}</p>
                  <p className="cart-product-category-description">{product.title}</p>
                  <button className="cart-product-remove" onClick={() => { handleCartAction(removeFromCart(cartprod)) }}><i className="bi bi-trash"></i><span>Remove</span></button>
                </div>
              </div>

              <div className="cart-product-price">
                ${product.price}
              </div>

              <div className="d-flex align-items-center">
                <div className="cart-product-qty">
                  <button className="qty-ctrl-btn" onClick={() => { handleCartAction(decreaseQuantity(cartprod)) }}>
                    <i className="bi bi-dash"></i>
                  </button>
                  <span className="qty-display">{cartprod.quantity}</span>
                  <button className="qty-ctrl-btn" onClick={() => { handleCartAction(increaseQuantity(cartprod)) }}>
                    <i className="bi bi-plus"></i>
                  </button>
                </div>
              </div>

              <div className="cart-product-total">
                ${ProductService.total(product.price, cartprod.quantity)}
              </div>
            </div>
          })}

          <div className="cart-product-action">
            <Link href='/products'>
              <button type="button" className="btn btn-outline-dark"><i className="bi bi-arrow-left"></i><span>Continue Shopping</span></button>
            </Link>
            <button type="button" className="btn btn-outline-dark" onClick={() => { handleCartAction(clearCart()) }}><i className="bi bi-trash"></i><span>Clear Cart</span></button>
          </div>

        </div> {/*cart product end here*/}

        <div className="col-3 cart-order-summary">
          <h3 className="mb-5">Order Summary</h3>
          <div className="order-subtotal">
            <p>Subtotal(totalItems)</p>
            <p>${subTotals}</p>
          </div>
          <div className="order-shipping">
            <p>SHIPPING</p>
            <p className="fw-bold">FREE</p>
          </div>
          <div className="order-tax">
            <p>Tax(10%)</p>
            <p >${taxs = ProductService.tax(subTotals)}</p>
          </div>
          <div className="order-total">
            <p>TOTAL</p>
            <p >{ProductService.summeryTotal(subTotals, taxs)}</p>
          </div>
          <button type="button" className="btn btn-danger mt-5 mb-5" onClick={()=>{router.push('/checkout')}}>Proceed To Checkout</button>

        </div>

      </div>
    </div>
  </>
}

export default Cart
