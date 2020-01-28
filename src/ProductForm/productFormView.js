import React from 'react'

const ProductForm = ({name, doSaveProduct}) => {
  const [product, setProduct] = React.useState({name})

  const doHandleFieldChange = ({target}) => {
    setProduct(prevProduct => ({...prevProduct , [target.name]: target.value}))
  }
  return (
    <form id="productForm" onSubmit={() => doSaveProduct(product)}>
      <label htmlFor="name" >Product Name</label>
      <input type="text" name="name" id="name" value={name} onChange={doHandleFieldChange} />
      <input type='submit' />
    </form>
  )
}

export default ProductForm