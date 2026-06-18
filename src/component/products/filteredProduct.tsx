"use client"
import React from 'react'
import { useSelector } from 'react-redux';
import ProductCard from './productCard/ProductCard';

function FilteredProduct(props:any) {
  const {isActiveFilter}=useSelector((state:any)=>state.getCategory);
  let products=props.products;
  let filtered= products.filter((p:any)=>{ 
    return isActiveFilter==='ALL' || p.category.toLowerCase().includes(isActiveFilter.toLowerCase());
  })
  return <div className="row row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3 ">
    {filtered.map((product:any) => {
          return <ProductCard key={product.id} product={product} />
        })}
  </div>
}

export default FilteredProduct
