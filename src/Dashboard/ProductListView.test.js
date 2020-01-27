import React from 'react'
import ReactDOM from 'react-dom'
import ProductListView from './ProductListView'
import * as MockProductsData from './mockProductsData'


describe("Product List", () => {
  
  let container

  const render = component => ReactDOM.render( component, container)

  beforeEach(() => {
    container = document.createElement('div')
  })

  it('renders a div wrapper with the rigth id', () => {
    //arrange
    const products = []
    // act
    render(<ProductListView products={products} />)

    //assert
    expect(container.querySelector('div#productListView')).not.toBe('null')
  })

  it('renders the product item', () => {
    
    // arrange
    const products = MockProductsData.products1

    // act
    render(<ProductListView products={products} />)

    // assert
    expect(container.textContent).toMatch('Sun Shine Swimming Pool')
    expect(container.textContent).toMatch('1')
    expect(container.textContent).toMatch('0')
    expect(container.textContent).toMatch('3999')
  })

  it('renders multiple products', () => {
    
    // arrange
    const products = MockProductsData.products

    // act
    render(<ProductListView products={products} />)
    // assert
    expect(container.textContent).toMatch('Sun Shine Swimming Pool')
    expect(container.textContent).toMatch('Stark')
    expect(container.textContent).toMatch('Carlson')
    expect(container.textContent).toMatch('Lark')
  })


})