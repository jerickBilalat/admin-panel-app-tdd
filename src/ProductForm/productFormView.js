import React from 'react'

const ProductForm = ({name, productType, doSaveProduct, productTypes}) => {
  const [product, setProduct] = React.useState({name, productType})

  const doHandleFieldChange = ({target}) => {
    setProduct(prevProduct => ({...prevProduct , [target.name]: target.value}))
  }
  return (
    <form id="productForm" onSubmit={() => doSaveProduct(product)}>
      <select name="productType" id="productType" value={productType} onChange={doHandleFieldChange}>
        <option>none</option>
        {productTypes.map( type => <option key={type} value={type}>{type}</option>)}
      </select>
      <label htmlFor="name" >Product Name</label>
      <input type="text" name="name" id="name" value={name} onChange={doHandleFieldChange} />
      <input type='submit' />
    </form>
  )
}
ProductForm.defaultProps = {productTypes: ['pool_table', 'swimming_pool', 'misc']}
export default ProductForm