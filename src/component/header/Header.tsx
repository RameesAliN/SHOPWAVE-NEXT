import Link from "next/link"
import '../../style/Header.css'
import SearchProduct from "./SearchProduct"
import TotalProduct from "./TotalProduct"


export default function Header(){
   return <>
    <nav className={`navbar navbar-expand-lg shopwave-navbar `}>
      <div className="container">

        <Link href="/" className="navbar-brand shopwave-brand">
          <span className="brand-text">ShopWave</span>
        </Link>

       <SearchProduct/>

        <ul className="navbar-nav align-items-center gap-1">

          <li className="nav-item">
            <Link href="/" className={'nav-link'}>
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/products" className={'nav-link'}>
              Products
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/about" className={'nav-link'}>
              About Us
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/contact" className={'nav-link'}>
              Contact Us
            </Link>
          </li>

          <li className="nav-item ms-2">
            <Link href="/cart" className="cart-icon-btn nav-link " aria-label="Shopping Cart">
              <i className="bi bi-bag-fill nav-cart"></i>
              <TotalProduct/>
            </Link>
          </li>

           <li className="nav-item ms-2">
              <Link href="/login" className={'nav-link'}> login</Link>
          </li>

        </ul>

      </div>
    </nav>
  </>
}