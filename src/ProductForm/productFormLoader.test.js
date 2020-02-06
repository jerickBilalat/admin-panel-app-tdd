import React from 'react'
import 'whatwg-fetch'
import { createContainer } from '../utils/testHelpers/domManipulators'
import * as MockProductsData from '../utils/testHelpers/mockProductsData'
import { ProductFormLoader } from './productFormLoader'
import * as ProductFormExports from './productFormView'

describe('x', () => {

  // shared arrange
  let fetchSpy
  let renderAndWait

  beforeEach(() => {
    ({renderAndWait } = createContainer())
    fetchSpy = jest.spyOn(window, 'fetch')
    fetchSpy.mockImplementation(() => Promise.resolve({ 
      ok: true, 
      json: () => Promise.resolve({...MockProductsData.product}) 
    }))

    jest.spyOn(ProductFormExports, 'ProductFormView')
      .mockReturnValue(null)
  })

  afterEach(() => {
    // shared clean up
    window.fetch.mockRestore()
    ProductFormExports.ProductFormView.mockRestore()
  })

  it('call fetch when component is mounted', async () => {
    // act
    await renderAndWait(<ProductFormLoader />)

    // assert
    expect(window.fetch).toHaveBeenCalledWith(
      '/products/5dec452ba6920d00175b848f',
      expect.objectContaining({
        method: 'GET',
        credentials: 'same-origin',
        headers: {'Content-type': 'application/json'}
      })
    )

  })

  it('initially pass empty product to ProductFormView Component', async () => {
    // arrange
    const initialProductState = {name: '', used: false, productType: ''}
    // act
    await renderAndWait(<ProductFormLoader />)

    // assert
    expect(ProductFormExports.ProductFormView).toHaveBeenCalledWith(
      expect.objectContaining(initialProductState),
      expect.anything()
    )

  })

  it('pass fetched product to ProductFormView comp', async () => {
    // arrange
    const fetchedProduct = {...MockProductsData.product}

    // act
    await renderAndWait(<ProductFormLoader />)

    // assert
    expect(ProductFormExports.ProductFormView).toHaveBeenLastCalledWith(
      expect.objectContaining({name: fetchedProduct.name, productType: fetchedProduct.productType, used: fetchedProduct.used}), expect.anything()
      
    )
  })

})