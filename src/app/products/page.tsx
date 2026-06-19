import React from 'react'
import ProductService from '@/services/product-services'
import ProductCard from '@/component/products/productCard/ProductCard';
import CategoryButton from '@/component/products/categoryButton';
import '../../style/Product.css'
import FilteredProduct from '@/component/products/filteredProduct';

export default async function Products() {
  const products = await ProductService.fetchProduct();
  //console.log(products)
  
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

