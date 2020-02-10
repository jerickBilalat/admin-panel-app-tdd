import React from 'react'
import {createShallowRenderer, getChildrenOf, type, id, className, click} from './shallowRenderingHelpers'
import ShallowRenderer from 'react-test-renderer/shallow'

describe('getChildrenOf', () => {
  it('returns no children', () => {
    expect(getChildrenOf(<div />)).toEqual([])
  })

  it('it resturns direct children', () => {
    expect(getChildrenOf(
    <div>
      <p>a</p>
      <p>b</p>
    </div>)).toEqual([<p>a</p>,
    <p>b</p>])
  })

  it('it returns text as array of one item', () => {
    expect(getChildrenOf(
    <div>
      text
    </div>)).toEqual(['text'])
  })

  it('it returns no children for text nodes', () => {
    expect(getChildrenOf('text')).toEqual([])
  })

  it('it returns no children for text nodes', () => {
    expect(getChildrenOf('text')).toEqual([])
  })

  it('it returns an array of children for element with one child', () => {
    expect(getChildrenOf(
      <div>
        <p>b</p>
      </div>)).toEqual([<p>b</p>])
  })

})

const TestComponent = ({children}) => (<React.Fragment>{children}</React.Fragment>) // need this because shallow renderer does not accept primitive component types susch <div></div>

describe('getNthChild', () => {
  let render, getNthChild

  beforeEach( () => {
    ({render, getNthChild} = createShallowRenderer())
  })

  it('returns undefined if the child does not exist', () => {
    render(<TestComponent />)
    expect(getNthChild(0)).not.toBeDefined()
  })

  it('returns child of rendered elements', () => {
    
    render(<TestComponent>
      <p>a</p>
      <p>b</p>
    </TestComponent>)

    expect(getNthChild(1)).toEqual(<p>b</p>)
  })

})

describe('getAllElementsMatching', () => {
  let render, getAllElementsMatching, getFirstElementMatching

  beforeEach( () => {
    ({render, getAllElementsMatching, getFirstElementMatching} = createShallowRenderer())
  }) 

  it('finds multiple direct children', () => {
    render(
      <TestComponent>
        <p>a</p>
        <p>b</p>
      </TestComponent>
    )

    expect(getAllElementsMatching(type('p')))
      .toEqual([
        <p>a</p>,
        <p>b</p>
    ])
  })

  it('it finds inderict children', () => {
    render(
      <TestComponent>
        <div>
           <p>a</p>
        </div>
      </TestComponent>
    )

    expect(getAllElementsMatching(type('p'))).toEqual([<p>a</p>])

  })

  it('find first direct child', () => {
    const renderer = new ShallowRenderer()

    renderer.render(<TestComponent>
      <div className='add-button'>
         <p>a</p>
      </div>
      <p><div>b</div></p>
      <p><div>c</div></p>
    </TestComponent>)

    const output = renderer.getRenderOutput().props.children.filter( x => x.props.className && x.props.className === 'add-button')[0]

    expect(output)
    .toEqual(
      <div className="add-button">
        <p>a</p>
      </div>
    )
    
  })

})