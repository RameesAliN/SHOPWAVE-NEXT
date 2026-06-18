import React from 'react'
import ProductService from '@/services/product-services'
import ProductCard from '@/component/productCard/ProductCard';
import '../../style/Product.css'

export default async function Products() {
  const products = await ProductService.fetchProduct();
  console.log(products)

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
          
          {/* {categories.map((cat) => {
            return <button className={`filter-chip ${activeFilter == cat ? 'filter-chip-active' : ''}`} onClick={() => setActiveFilter(cat)}>
              {cat}</button>
          })} */}gggg



        </div>
      </div>

      <div className="row row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3 ">
        {/* {filterProduct.map((product) => {
          return <ProductCard product={product} />
        })} */}
        {products.map((p:any)=>{
            return <ProductCard key={p.id} product={p}/>
          })}
      </div>

    </div>
  </>
}

