import ProductCard from '@/component/productCard/ProductCard';
import ProductService from '@/services/product-services';
import React from 'react'

export async function ProductList (props:any) {
  const params = await props.params;
  const productId = await params.singleProduct;
  const product = await ProductService.getProductById(productId);
  return <ProductCard key={product.id} product={product}/>
}

export default ProductList
