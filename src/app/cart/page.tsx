import React from 'react'
import Link from 'next/link'
import '../../style/Cart.css'

function addToCart() {
  return <>
    <div className="cart-page">

      <div className="cart-title">
        <div className="container">
          <h1 >Your Cart</h1>
          <p>totalItems items</p>
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
          {/* {cart.map((cartprod) => {

            const product = cartprod.products;

            subTotals = subTotal(cartprod.quantity, product.price, subTotals)

            return <div className="cart-product-items">
              <div className="cart-product-item">
                <img className="cart-product-image" src={product.image}></img>
                <div>
                  <p className="cart-product-category">{product.category.toUpperCase()}</p>
                  <p className="cart-product-category-description">{product.title}</p>
                  <button className="cart-product-remove" onClick={()=>dispatch(removeFromCart(cartprod))}  ><i className="bi bi-trash"></i><span>Remove</span></button>
                </div>
              </div>

              <div className="cart-product-price">
                ${product.price}
              </div>


              <div className="d-flex align-items-center">
                <div className="cart-product-qty">

                  <button className="qty-ctrl-btn" onClick={() => { dispatch(decreaseQuantity(cartprod)) }}>
                    <i className="bi bi-dash"></i>
                  </button>
                  <span className="qty-display">{cartprod.quantity}</span>

                  <button className="qty-ctrl-btn" onClick={() => { dispatch(increaseQuantity(cartprod)) }}>
                    <i className="bi bi-plus"></i>
                  </button>
                </div>
              </div>

              <div className="cart-product-total">
                ${total(cartprod.quantity, product.price)}
              </div>

            </div>

          })} */}

          <div className="cart-product-action">
            <Link href='/products'>
              <button type="button" className="btn btn-outline-dark"><i className="bi bi-arrow-left"></i><span>Continue Shopping</span></button>
            </Link>
            <button type="button"  className="btn btn-outline-dark"><i className="bi bi-trash"></i><span>Clear Cart</span></button>
          </div>

        </div> {/*cart product end here*/}

        <div className="col-3 cart-order-summary">
          <h3 className="mb-5">Order Summary</h3>
          <div className="order-subtotal">
            <p>Subtotal(totalItems)</p>
            <p>$subTotals</p>
          </div>
          <div className="order-shipping">
            <p>SHIPPING</p>
            <p className="fw-bold">FREE</p>
          </div>
          <div className="order-tax">
            <p>Tax(10%)</p>
            <p >$taxs = tax(subTotals)</p>
          </div>
          <div className="order-total">
            <p>TOTAL</p>
            <p >summeryTotal</p>
          </div>
          <button type="button" className="btn btn-danger mt-5 mb-5" >Proceed To Checkout</button>

        </div>

      </div>
    </div>
  </>
}

export default addToCart
