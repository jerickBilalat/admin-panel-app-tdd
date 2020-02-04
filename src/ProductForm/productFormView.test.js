import React from 'react'
import {createContainer} from '../utils/testHelpers/domManipulators'
import * as MockProductsData from '../utils/testHelpers/mockProductsData'
import ReactTestUtils, {act} from 'react-dom/test-utils'
import ProductFormView from './ProductFormView'

describe('Product Form Render basic fields', () => {

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

describe('Product form renders radion button fields', () => {
  // arrange
  let render, container

  beforeEach(() => {
    ({render, container} = createContainer())
  })

  // helpers
  const queryFormById = id => container.querySelector(`form[id=${id}]`)
  const queryFormFieldById = id => queryFormById('productForm').elements[`${id}`]

  it('renders radio button fields', () => {
    // act
    render(<ProductFormView />)
    
    // assert
    const usedRadioButton = queryFormFieldById('used')
    expect(usedRadioButton).toBeDefined()
    expect(usedRadioButton).not.toBeNull()
    expect(usedRadioButton.tagName).toEqual('INPUT')
    expect(usedRadioButton.type).toEqual('radio')
  })

  it('renders existing value', () => {
    // act
    render(<ProductFormView {...MockProductsData.product} />)

    // assert
    expect(queryFormFieldById('used').checked).not.toBeTruthy()
  })

})

describe('Product Form Submittion', () => {

  // shared arrange
  const originalFetch = window.fetch;
  let fetchSpy;
  
  let render, container

  beforeEach(() => {
    // shared arrange
    ({render, container} = createContainer())
    window.fetch = jest.fn()
    fetchSpy = window.fetch
    fetchSpy.mockImplementation( () => Promise.resolve({ ok: true, json: () => Promise.resolve({...MockProductsData.product}) }))
  })

  afterEach(() => {
    // shared clean up
    window.fetch = originalFetch
  })

  it('prevents default action when submitting a form', async () => {
    // ararnge
    render(<ProductFormView />)
    const preventDefaultSpy = jest.fn()
    //act
    await ReactTestUtils.Simulate.submit(container.querySelector("form[id='productForm']"), {
      preventDefault: preventDefaultSpy
    })

    // assert
    expect(preventDefaultSpy).toHaveBeenCalled()

  })

  it('calls fetch with the right arguments when submitted', async () => {

    // arrange
    render(<ProductFormView />)

    // act
    await ReactTestUtils.Simulate.submit(container.querySelector("form[id='productForm']"))

    // assert
    expect(fetchSpy).toHaveBeenCalled()
    expect(fetchSpy).toBeCalledWith(expect.anything(), {method: 'POST', credentials: 'same-origin', headers: {'Content-Type': 'application/json'}, body: expect.anything()})

  })

  it('notifies when form is sumitted', async () => {
    // ararnge
    const doNotifyOnSaveSpy = jest.fn()

    render(<ProductFormView doNotifyOnSave={doNotifyOnSaveSpy} />)

    // act
    await act( async () => {
      ReactTestUtils.Simulate.submit(container.querySelector("form[id='productForm']"))
    })

    // assert
    expect(doNotifyOnSaveSpy).toHaveBeenCalled()
    expect(doNotifyOnSaveSpy).toHaveBeenCalledWith(expect.objectContaining({...MockProductsData.product}))

  })

  it('does NOT notify when form is sumition POST request returned an error', async () => {
    // ararnge
    const doNotifyOnSaveSpy = jest.fn()
    fetchSpy.mockImplementation(() => Promise.reject({ok: false}) )

    render(<ProductFormView doNotifyOnSave={doNotifyOnSaveSpy} />)

    // act
    await act( async () => {
      ReactTestUtils.Simulate.submit(container.querySelector("form[id='productForm']"))
    })

    // assert
    expect(doNotifyOnSaveSpy).not.toHaveBeenCalled()

  })


  it('submits existing values', async () => {
 
    // arrange
    render(<ProductFormView {...MockProductsData.product} />)

    // act
    await ReactTestUtils.Simulate.submit(container.querySelector("form[id='productForm']"))


    // assert
    expect(fetchSpy).toHaveBeenCalled()
    
    expect(fetchSpy).toBeCalledWith(expect.anything(), {method: 'POST', credentials: 'same-origin', headers: {'Content-Type': 'application/json'},
      body: expect.anything()
    })

    expect(MockProductsData.product).toMatchObject(JSON.parse(fetchSpy.mock.calls[0][1].body))

  })

  it('submits new values', async () => {

    // arrange
    render(<ProductFormView {...MockProductsData.product} />)

    const newValues = {
      name: "new name",
      productType: "new type",
      used: true
    }

    // act
    await ReactTestUtils.Simulate.change(container.querySelector("form[id='productForm']").elements.name, {target: {name: 'name', value: newValues.name}})
    await ReactTestUtils.Simulate.change(container.querySelector("form[id='productForm']").elements.productType, {target: {name: 'productType', value: newValues.productType}})
    await ReactTestUtils.Simulate.change(container.querySelector("form[id='productForm']").elements.used, {target: {name: 'used', value: newValues.used}})
    await ReactTestUtils.Simulate.submit(container.querySelector("form[id='productForm']"))


    // assert
    expect(fetchSpy).toHaveBeenCalled()
    expect(fetchSpy).toBeCalledWith(expect.anything(), {method: 'POST', credentials: 'same-origin', headers: {'Content-Type': 'application/json'},
      body: expect.anything()
    })
    const parsedBody = JSON.parse(fetchSpy.mock.calls[0][1].body)
    expect(newValues).toEqual(parsedBody)

  })



})

// Previors and ways to unit test the form submition. See Book for more
//   it('submits existing values', async () => {
//     expect.hasAssertions()

//     // arrange and assert
//     render(<ProductFormView {...MockProductsData.product} doSaveProduct={ ({name, productType, used}) => {
//       expect(name).toEqual('Sun Shine Swimming Pool')
//       expect(productType).toEqual('swimming_pool')
//       expect(used).not.toBeTruthy()
//     }} />)

//     // act
//     await ReactTestUtils.Simulate.submit(container.querySelector("form[id='productForm']"))

//   })

//   it('submits existing values using the variable technique', async () => {
//     // arrange
//     let onSubmitArgs

//     render(<ProductFormView {...MockProductsData.product} doSaveProduct={ product => {
//       onSubmitArgs = product
//     }} />)

//     // act
//     await ReactTestUtils.Simulate.submit(container.querySelector("form[id='productForm']"))
    
//     // assert
//     expect(MockProductsData.product).toMatchObject(onSubmitArgs)
//   })

//   it('submits existing values using a custom spy', async () => {
//     // arrange
//     const spy = () => {
//       let receivedArgs
//       return {
//         fn: args => receivedArgs = args,
//         receivedArgs: () => receivedArgs,
//         receivedArg: n => receivedArgs[n] 
//       }
//     }

//     let submitSpy = spy()

//     render(<ProductFormView {...MockProductsData.product} doSaveProduct={submitSpy.fn} />)

//     // act
//     await ReactTestUtils.Simulate.submit(container.querySelector("form[id='productForm']"))

//     // assert
//     expect(MockProductsData.product).toMatchObject(submitSpy.receivedArgs())

//   })

//   it('submits existing values using a jest spy', async () => {
//     let submitSpy = jest.fn()

//     render(<ProductFormView {...MockProductsData.product} doSaveProduct={submitSpy} />)

//     // act
//     await ReactTestUtils.Simulate.submit(container.querySelector("form[id='productForm']"))

//     // assert
//     expect(submitSpy).toHaveBeenCalled()
//     expect(submitSpy).toHaveBeenCalledWith({
//       name: MockProductsData.product.name,
//       productType: MockProductsData.product.productType,
//       used: MockProductsData.product.used
//     })
//   })
  
//   it('submits new values', async () => {
//     expect.hasAssertions()

//     // arrange and assert
//     render(<ProductFormView {...MockProductsData.product} doSaveProduct={ ({name, productType, used}) => {
//       expect(name).toEqual('new Product Name')
//       expect(productType).toEqual('new_product_type')
//       expect(used).toBeTruthy()
//     }} />)

//     // act
//     await ReactTestUtils.Simulate.change(container.querySelector("form[id='productForm']").elements.name, {target: {name: 'name', value: 'new Product Name'}})
//     await ReactTestUtils.Simulate.change(container.querySelector("form[id='productForm']").elements.productType, {target: {name: 'productType', value: 'new_product_type'}})
//     await ReactTestUtils.Simulate.change(container.querySelector("form[id='productForm']").elements.used, {target: {name: 'used', value: true}})
//     await ReactTestUtils.Simulate.submit(container.querySelector("form[id='productForm']"))

//   })
