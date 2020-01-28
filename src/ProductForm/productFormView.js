import React from 'react'

const ProductForm = ({name, doSaveProduct}) => {
  return (
    <form id="productForm" onSubmit={() => doSaveProduct({productName: name})}>
      <label htmlFor="productName" >Product Name</label>
      <input type="text" name="productName" id="productName" value={name} readOnly />
    </form>
  )
}

export default ProductForm