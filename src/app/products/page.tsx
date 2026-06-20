import React from 'react'
import ProductService from '@/services/product-services'
import ProductCard from '@/component/products/productCard/ProductCard';
import CategoryButton from '@/component/products/categoryButton';
import '../../style/Product.css'
import FilteredProduct from '@/component/products/filteredProduct';

export default async function Products() {
  const products = await ProductService.fetchProduct();
  //console.log(products)

  if (products === null) {
    return (
      <div className="product-list-page">
        <div className="container text-center mt-5">
          <h2 className="text-danger">Something went wrong</h2>
          <p>We couldn't load the products right now. Please try again later.</p>
        </div>
      </div>
    );
  }
  
  return <>
    <div className="product-list-page">

      <div className="product-list-title">
        <div className="container">
          <h1>All Product</h1>
          <span className="product-list-title-sub"> product found</span>
        </div>
      </div>

      <div className="filters-toolbar px-5 py-3">
        <div className="category-filters">
          
          {ProductService.productCategory.map((cat) => {
            return <CategoryButton key={cat} cat={cat}/>
          })}

        </div>
      </div>
          <FilteredProduct products={products}/>
    </div>
  </>
}

