import React from 'react'
import ReactDOM from 'react-dom'
import ProductListView from './ProductListView'


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

  it('renders the product name', () => {
    
    // arrange
    const products = [{ name: 'Sterling', id: 1}]

    // act
    render(<ProductListView products={products} />)

    // assert
    expect(container.textContent).toMatch('Sterling')
  })

  it('renders multiple products', () => {
    
    // arrange
    const products = [{ name: 'Hampton', id: 1 }, {name: 'Sterling', id: 2} ]

    // act
    render(<ProductListView products={products} />)
    // assert
    expect(container.textContent).toMatch('Hampton')
    expect(container.textContent).toMatch('Sterling')
  })


})