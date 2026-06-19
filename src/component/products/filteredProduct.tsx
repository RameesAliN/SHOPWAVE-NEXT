"use client"
import React from 'react'
import { useSelector } from 'react-redux';
import ProductCard from './productCard/ProductCard';

function FilteredProduct(props: any) {
  const { isActiveFilter, userInput } = useSelector((state: any) => state.getProduct);
  let products = props.products;

  let filtered = products.filter((p: any) => {
    const matchSearch = p.title.toLowerCase().includes(userInput.toLowerCase()) ||  p.category.toLowerCase().includes(userInput.toLowerCase());
    const matchCategory = isActiveFilter === 'ALL' ||
      p.category.toLowerCase().includes(isActiveFilter.toLowerCase());
    return matchCategory && matchSearch
  })
  return <div className="row row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3 ">
    {filtered.map((product: any) => {
      return <ProductCard key={product.id} product={product} />
    })}
  </div>
}

export default FilteredProduct
