import React from 'react';

export default ({products}) => {
return (
  <div id="productListView" >
    {products.length
    ? products.map( product => (
      <div key={product._id}>
        <p>{product.name}</p>
        <p>{product.inStock}</p>
        <p>{product.sold}</p>
        <p>{product.price}</p>
      </div>
    ))
    : 'No Products'
    }
  </div>)
}