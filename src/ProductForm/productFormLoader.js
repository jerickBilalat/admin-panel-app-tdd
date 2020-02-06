import React from 'react'
import {ProductFormView} from './productFormView'

export const ProductFormLoader = () => {

  const [product, setProduct] = React.useState({name: "", used: false, productType: ''})

  React.useEffect(() => {
    async function fetctProduct() {
      const response = await window.fetch('/products/5dec452ba6920d00175b848f', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {'Content-type': 'application/json'}
      })

      const result = await response.json()
      setProduct(result)
    }
    fetctProduct()
  }, [])

  return (
    <ProductFormView {...product}/>
  )
}

