import React from 'react'
import {ProductListView} from './ProductListView'

export const ProductListViewLoader = ({count}) => {
  const [products, setProducts] = React.useState([])

  React.useEffect( () => {

   async function fecthProductListViewData() {
      const response = await window.fetch(`/products/${count}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {'Content-type': 'application/json'}
      })
    
      setProducts(await response.json())
    }

    fecthProductListViewData()
    
  }, [count])

  return (
    <ProductListView products={products} />
  )
}

ProductListViewLoader.defaultProps = {count: 4}