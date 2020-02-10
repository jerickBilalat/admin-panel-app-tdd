import React from 'react';
import {ProductListViewLoader} from './Dashboard/ProductListViewLoader'
import {ProductFormLoader} from './ProductForm/productFormLoader'

function App() {
  const [view, setView] = React.useState('product_list_view')

  function renderView(view) {
    switch(view) {
      case 'product_form':
        return <ProductFormLoader onSave={() => setView('product_list_view')} />
      default:
        return (
          <React.Fragment>
            <div className='add-button'>
              <button onClick={ () => setView('product_form') }>Add Product</button>        
            </div>
            <ProductListViewLoader />
          </React.Fragment>
        ) 
    }
  }

  return renderView(view)
}

export default App;
