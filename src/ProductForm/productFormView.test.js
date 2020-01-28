import React from 'react'
import {createContainer} from '../utils/testHelpers/domManipulators'
import * as MockProductsData from '../utils/testHelpers/mockProductsData'
import ReactTestUtils from 'react-dom/test-utils'
import ProductFormView from './ProductFormView'

describe('Product Form Render', () => {

  // arrange
  let container, render

  beforeEach(() => {
    // arrange
    ({render, container } = createContainer())
  })

  it('renders a Product Form', () => {

    // act
    render(<ProductFormView />)

    // assert
    expect(container.querySelector("form[id='productForm']")).not.toBeNull()

  })

  it('renders the product name input form field as a text box', () => {

    // act
    render(<ProductFormView />)

    // assert
    const inputTextField = container.querySelector("form[id='productForm']").elements.name

    expect(inputTextField).not.toBeNull()
    expect(inputTextField.tagName).toEqual('INPUT')
    expect(inputTextField.type).toEqual('text')

  })

  it('renders the existing values', () => {
    // act
    render(<ProductFormView {...MockProductsData.product} />)

    // assert
    const productNameInputTextField = container.querySelector("form[id='productForm']").elements.name

    expect(productNameInputTextField.value).toEqual('Sun Shine Swimming Pool')
  })

  it('renders a label for the name input', () => {
    // act
    render(<ProductFormView />)

    // assert
    const productNameInputLabelField = container.querySelector("label[for='name']")
    expect(productNameInputLabelField).not.toBeNull()
    expect(productNameInputLabelField.textContent).toEqual('Product Name')
    
  })

  it('renders a label with for attribute matching the id of the matching input', () => {
    // act
    render(<ProductFormView />)

    // assert
    const productNameInputTextField = container.querySelector("form[id='productForm']").elements.name
    expect(productNameInputTextField.id).toEqual('name')
    
  })

  it('renders a submit button', () => {
    // act
    render(<ProductFormView />)

    // assert
    expect(container.querySelector("input[type='submit']")).not.toBeNull()
  })

})

describe('Product Form Submittion', () => {
  
  // arrange
  let render, container

  beforeEach(() => {
    ({render, container} = createContainer())
  })


  it('submits existing values', async () => {
    expect.hasAssertions()

    // arrange and assert
    render(<ProductFormView {...MockProductsData.product} doSaveProduct={ ({name}) => {
      expect(name).toEqual('Sun Shine Swimming Pool')
    }} />)

    // act
    await ReactTestUtils.Simulate.submit(container.querySelector("form[id='productForm']"))

  })

  it('submits new values', async () => {
    expect.hasAssertions()

    // arrange and assert
    render(<ProductFormView {...MockProductsData.product} doSaveProduct={ ({name}) => {
      expect(name).toEqual('new Product Name')
    }} />)

    // act
    await ReactTestUtils.Simulate.change(container.querySelector("form[id='productForm']").elements.name, {target: {name: 'name', value: 'new Product Name'}})
    await ReactTestUtils.Simulate.submit(container.querySelector("form[id='productForm']"))

  })


})