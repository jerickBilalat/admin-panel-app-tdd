import React from 'react'
import {createContainer} from '../utils/testHelpers/domManipulators'
import * as MockProductsData from '../utils/testHelpers/mockProductsData'
import ReactTestUtils from 'react-dom/test-utils'
import ProductFormView from './ProductFormView'

describe('Product Form Render text fields', () => {

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

describe('Product Form render select fields', () => {
  // arrange
  let render, container
  
  beforeEach(() => {
    ({render, container} = createContainer())
  })

  // helper
  const queryFormById = id => container.querySelector(`form[id=${id}]`)
  const queryFormFieldById = id => queryFormById('productForm').elements[`${id}`]
  
  it('renders select boxes', () => {
    // act
    render(<ProductFormView />)

    // assert
    expect(queryFormFieldById('productType')).not.toBeNull()
    expect(queryFormFieldById('productType').tagName).toEqual('SELECT')
  })

  it('initially has a blank value choosen', () => {
    // act
    render(<ProductFormView />)

    // assert
    const firstOptionElement = queryFormFieldById('productType').childNodes[0]
    expect(firstOptionElement.selected).toBeTruthy()
    expect(firstOptionElement.textContent).toBe('none')
  })

  it('list all product types', () => {
    // arrange
    const productTypes = [ "type1", "type2"]

    // act
    render(<ProductFormView productTypes={productTypes} />)

    // assert
    const optionNodes = Array.from(queryFormFieldById('productType').childNodes)
    const optionNodesValues = optionNodes.map( node => node.value )
    const optionNodesTexts = optionNodes.map( node => node.textContent )
    expect(optionNodesTexts).toEqual( expect.arrayContaining(productTypes))
    expect(optionNodesValues).toEqual( expect.arrayContaining(productTypes))
  })

  it('pre-select existing values', () => {
    // act
    render(<ProductFormView {...MockProductsData.product} />)

    // helper
    const findSelectedOptionNode = (selectNode, selectedTextContent ) => {
      const optionNodes = Array.from(selectNode.childNodes)
      return optionNodes.find( node => node.textContent === selectedTextContent)
    }
    // assert
    const preSelectedOption = findSelectedOptionNode(queryFormFieldById('productType'), 'swimming_pool')
    expect(preSelectedOption.selected).toBeTruthy();
    
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
    render(<ProductFormView {...MockProductsData.product} doSaveProduct={ ({name, productType}) => {
      expect(name).toEqual('Sun Shine Swimming Pool')
      expect(productType).toEqual('swimming_pool')
    }} />)

    // act
    await ReactTestUtils.Simulate.submit(container.querySelector("form[id='productForm']"))

  })

  it('submits new values', async () => {
    expect.hasAssertions()

    // arrange and assert
    render(<ProductFormView {...MockProductsData.product} doSaveProduct={ ({name, productType}) => {
      expect(name).toEqual('new Product Name')
      expect(productType).toEqual('new_product_type')
    }} />)

    // act
    await ReactTestUtils.Simulate.change(container.querySelector("form[id='productForm']").elements.name, {target: {name: 'name', value: 'new Product Name'}})
    await ReactTestUtils.Simulate.change(container.querySelector("form[id='productForm']").elements.productType, {target: {name: 'productType', value: 'new_product_type'}})
    await ReactTestUtils.Simulate.submit(container.querySelector("form[id='productForm']"))

  })


})