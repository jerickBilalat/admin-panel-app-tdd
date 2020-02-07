import React from 'react'
import 'whatwg-fetch'
import { createContainer } from '../utils/testHelpers/domManipulators'
import * as MockProductsData from '../utils/testHelpers/mockProductsData'
import { ProductListViewLoader } from './ProductListViewLoader'
import * as ProductListViewExports from './ProductListView'


describe('ProductFormLoader', () => {
  // shared arrange
  let renderAndWait

  beforeEach(() => {
    ({renderAndWait} = createContainer())

    jest
      .spyOn(window, 'fetch')
      .mockImplementation(() => Promise.resolve(
        {
          ok: true,
          json: () => Promise.resolve([...MockProductsData.products])
        }
      ))

    jest
      .spyOn(ProductListViewExports, 'ProductListView')
      .mockReturnValue(null)

  })

  // shared clean up
  afterEach(() => {
    window.fetch.mockRestore()
    ProductListViewExports.ProductListView.mockRestore()
  })

  it('calls fetch when component is mounted', async () => {
    // act
    await renderAndWait(<ProductListViewLoader count={4} />)

    //assert
    expect(window.fetch).toHaveBeenCalledWith(
      '/products/4',
      expect.objectContaining({
        method: 'GET',
        credentials: 'same-origin',
        headers: {'Content-type': 'application/json'}
      })
    )
  })

  it('initially pass empty prdouct prop to ProductListVeiw', async() => {
    // render
    await renderAndWait(<ProductListViewLoader />)

    // assert
    expect(ProductListViewExports.ProductListView).toHaveBeenCalledWith({products: []}, expect.anything())
  } )

  it('passed fetched data to ProductListView component', async () => {
    // act
    await renderAndWait(<ProductListViewLoader count={4} />)

    // assert
    expect(ProductListViewExports.ProductListView).toHaveBeenLastCalledWith(
    {products: expect.arrayContaining(MockProductsData.products)},
     expect.anything()
    )
  })

})