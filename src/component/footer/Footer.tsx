import Link from "next/link"
import '../../style/footer.css'

export default function Footer() {
  return <>
    <div className="footer">

      <div className="container">
        <div className="row footer-div">

          <div className="col-lg-6">
            <div className="footer-logo">
              <i className="bi bi-bag-heart-fill social-link"></i>
              <span>ShopWave</span>
            </div>

            <p className="footer-tagline">
              The shop for electronics and dress for women and men
            </p>

            <div className='social-links'>
              <i className={`bi bi-facebook social-link`}></i>
              <i className={`bi bi-youtube social-link`}></i>
              <i className={`bi bi-instagram social-link`}></i>
              <i className={`bi bi-twitter social-link`}></i>
            </div>
          </div>

          <div className="col-lg-4">
            <h5 className="footer-heading">QUICK LINKS</h5>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/cart">Cart</Link></li>
            </ul>
          </div>

          <div className="col-lg-2">
            <h5 className="footer-heading">CATEGORIES</h5>
            <ul className="footer-links">
              <li><Link href="/">Electronics</Link></li>
              <li><Link href="/">Jewellery</Link></li>
              <li><Link href="/">Men's Fashion</Link></li>
              <li><Link href="/">Women's Fashion</Link></li>
            </ul>
          </div>


        </div>
      </div>
    </div>
  </>
}