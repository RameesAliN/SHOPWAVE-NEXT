import Link from "next/link";

function OrderSuccess() {
  return (
    <div className="text-center mt-5">
      <h1>🎉 Order Placed Successfully!</h1>
      <p>Thank you for your purchase.</p>
      <Link href='/products'>
        <button className="btn btn-dark mt-3">Continue Shopping</button>
      </Link>
    </div>
  );
}

export default OrderSuccess;