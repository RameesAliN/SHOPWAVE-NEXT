"use client"
import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { useAppDispatch } from "@/store/hooks";
import ProductService from "@/services/product-services";
import { placeOrder, setDefaultAddress, loadDefaultAddress, setAddress } from "../../slice/checkoutSlice";
import { useRouter } from "next/navigation";
import '../../style/Checkout.css';
import { setLoginStatus } from "@/slice/loginSlice";


function Checkout() {
  const [isDefault, setIsDefault] = useState(false);
  const { cart, totalItems } = useSelector((state:any) => state.getCart);
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const { address } = useSelector((state:any) => state.getCheckout);

  useEffect(() => {
    dispatch(loadDefaultAddress());
  }, []);


  // address form state
  // const [address, setAddress] = useState({
  //   fullName: '',
  //   phone: '',
  //   address: '',
  //   city: '',
  //   state: '',
  //   pincode: ''
  // });

  // calculate totals
  let subTotal = cart.reduce((sum:number, item:any) => sum + item.quantity * item.products.price, 0);
  let tax = subTotal * 0.1;
  let total = subTotal + tax;

  function handleChange(e:any) {
    dispatch(setAddress({ name: e.target.name, value: e.target.value }))
  }

  async function handlePlaceOrder() {
  // check all fields filled
  if (!address.fullName || !address.phone || !address.address || !address.city || !address.state || !address.pincode) {
    alert('Please fill all address fields!');
    return;
  }

  try {
    await dispatch(placeOrder({ total, address })).unwrap();

    if (isDefault) {
      await dispatch(setDefaultAddress(address)).unwrap();
    }

    navigate.push('/order-success');
    
  } catch (error: any) {
    if (error.message === 'Session expired' || error.message === 'User not logged in') {
      localStorage.removeItem('access_token');
      dispatch(setLoginStatus('Login'))
      navigate.push('/login');
    } else {
      alert('Failed to place order. Please try again.');
    }
  }
}

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-layout">

        {/* left side */}
        <div className="checkout-left">

          {/* address form */}
          <div className="checkout-address">
            <h3>Shipping Address</h3>
            <div className="address-form">
              <input name="fullName" placeholder="Full Name" value={address.fullName} onChange={handleChange} />
              <input name="phone" placeholder="Phone Number" value={address.phone} onChange={handleChange} />
              <input name="address" placeholder="Address" value={address.address} onChange={handleChange} />
              <input name="city" placeholder="City" value={address.city} onChange={handleChange} />
              <input name="state" placeholder="State" value={address.state} onChange={handleChange} />
              <input name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleChange} />
            </div>
          </div>

          <div className="default-address-check">
            <input type="checkbox" id="defaultAddress" checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)} />
            <label htmlFor="defaultAddress">Set as Default Address</label>
          </div>

          {/* order items */}
          <div className="checkout-items">
            <h3>Order Summary</h3>
            {cart.map((cartprod:any) => (
              <div className="checkout-item" key={cartprod.id}>
                <img src={cartprod.products.image} alt={cartprod.products.title} />
                <div>
                  <p>{cartprod.products.title}</p>
                  <p>Qty: {cartprod.quantity}</p>
                </div>
                <p>${ProductService.formatCurrency(cartprod.quantity * cartprod.products.price * 100)}</p>
              </div>
            ))}
          </div>

        </div>

        {/* price summary */}
        <div className="checkout-summary">
          <div className="checkout-row">
            <p>Subtotal({totalItems} items)</p>
            <p>${subTotal.toFixed(2)}</p>
          </div>
          <div className="checkout-row">
            <p>Shipping</p>
            <p className="fw-bold">FREE</p>
          </div>
          <div className="checkout-row">
            <p>Tax(10%)</p>
            <p>${tax.toFixed(2)}</p>
          </div>
          <div className="checkout-row total">
            <p>TOTAL</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <button onClick={handlePlaceOrder} className="btn btn-danger mt-4">
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
}

export default Checkout;