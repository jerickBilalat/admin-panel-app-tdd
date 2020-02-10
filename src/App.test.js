import React from 'react'
import App from './App'
import {createShallowRenderer, type, getChildrenOf, className} from './utils/testHelpers/shallowRenderingHelpers'
import {ProductListViewLoader} from './Dashboard/ProductListViewLoader'
import {ProductListView} from './Dashboard/ProductListView'
import {ProductFormLoader} from './ProductForm/productFormLoader'
import {ProductFormView} from './ProductForm/productFormView'
import ShallowRenderer from 'react-test-renderer/shallow'



describe('App', () => {
  let render, getAllElementsMatching, getNthChild, getFirstElementMatching, logOutput

  beforeEach(() => {
    ({render, getAllElementsMatching, getNthChild, getFirstElementMatching, logOutput} = createShallowRenderer())
  })

  it('initially render ProductListViewLoader', () => {
    render(<App />)
    expect(getAllElementsMatching(type(ProductListViewLoader))).toBeDefined()
    expect(getAllElementsMatching(type(ProductListView))).toBeDefined()
  })

  it('renders a button bar as a first child', () => {

    const renderer = new ShallowRenderer()
    
    renderer.render(<App />)  
    expect(renderer.getRenderOutput().props.children.filter(x => x.props.className === 'add-button')[0]).toBeDefined()
  })

  it ('renders a button element with proper text', () => {
    render(<App />)
    const buttonParent = getFirstElementMatching( className('add-button') )
    const buttonElement = getChildrenOf(buttonParent)[0]
    expect(buttonElement.type).toEqual('button')
    expect(buttonElement.props.children).toEqual('Add Product')
  })

  it('renders ProductFormLoader and ProductLForm and not render ProductListView and its loader when button to add product is clicked', () => {
    
    render(<App />)
    const buttonParent = getFirstElementMatching( className('add-button') )
    const buttonElement = getChildrenOf(buttonParent)[0]

    // act
    buttonElement.props.onClick()

    // assert
    expect(getFirstElementMatching(type(ProductFormLoader))).toBeDefined()
    expect(getFirstElementMatching(type(ProductListViewLoader))).not.toBeDefined()
  })

  it('it does not render add product button when ProductFormLoader is rendendered', () => {
    // arrange
    render(<App />)

    const buttonParent = getFirstElementMatching( className('add-button') )
    const buttonElement = getChildrenOf(buttonParent)[0]

    // act
    buttonElement.props.onClick()

    expect(getFirstElementMatching(className('add-button'))).not.toBeDefined()

  })

  it('it renders ProductListView when ProductFormView sumitted', () => {
    // arrange
    const renderer = new ShallowRenderer()
    
    renderer.render(<App />)  

    const addButton = renderer.getRenderOutput().props.children.filter(x => x.props.className === 'add-button')[0].props.children

    // act
    addButton.props.onClick()

    const ProductForm = renderer.getRenderOutput()
    ProductForm.props.onSave()

    // assert
    expect(renderer.getRenderOutput().props.children.filter(x => x.type === ProductListViewLoader)[0]).toBeDefined()

  })

})