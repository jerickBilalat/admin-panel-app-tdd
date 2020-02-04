import React from 'react'

const ProductForm = ({name, used, productType, productTypes, doNotifyOnSave}) => {
  const [product, setProduct] = React.useState({name, productType, used})

  const doHandleFieldChange = ({target}) => {
    setProduct(prevProduct => ({...prevProduct , [target.name]: target.value}))
  }

  const doHandleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await window.fetch('/product', {method: 'POST', credentials: 'same-origin', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(product)})

      const result = await response.json()
      doNotifyOnSave(result)

    } catch (error) {
      console.log(error)
    }
    
    
  }

  return (
    <form id="productForm" onSubmit={doHandleSubmit}>
      <select name="productType" id="productType" value={productType} onChange={doHandleFieldChange}>
        <option>none</option>
        {productTypes.map( type => <option key={type} value={type}>{type}</option>)}
      </select>
      <input type="radio" id="used" name="used" checked={used} onChange={doHandleFieldChange} />
      <label htmlFor="name" >Product Name</label>
      <input type="text" name="name" id="name" value={name} onChange={doHandleFieldChange} />
      <input type='submit' />
    </form>
  )
}
ProductForm.defaultProps = {productTypes: ['pool_table', 'swimming_pool', 'misc'], doNotifyOnSave: () => {}}
export default ProductForm