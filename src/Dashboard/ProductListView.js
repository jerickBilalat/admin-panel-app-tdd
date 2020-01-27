import React from 'react';

export default ({products}) => {
return (
  <div id="productListView" >
    {products.length && products.map( product => <p key={product.id}>{product.name}</p>)}
  </div>)
}