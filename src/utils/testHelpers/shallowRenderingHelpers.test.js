import React from 'react'
import {createShallowRenderer, childrenOf, type, id, className, click} from './shallowRenderingHelpers'

describe('childrenOf', () => {
  it('returns no children', () => {
    expect(childrenOf(<div />)).toEqual([])
  })

  it('it resturns direct children', () => {
    expect(childrenOf(
    <div>
      <p>a</p>
      <p>b</p>
    </div>)).toEqual([<p>a</p>,
    <p>b</p>])
  })

  it('it returns text as array of one item', () => {
    expect(childrenOf(
    <div>
      text
    </div>)).toEqual(['text'])
  })

  it('it returns no children for text nodes', () => {
    expect(childrenOf('text')).toEqual([])
  })

  it('it returns no children for text nodes', () => {
    expect(childrenOf('text')).toEqual([])
  })

  it('it returns an array of children for element with one child', () => {
    expect(childrenOf(
      <div>
        <p>b</p>
      </div>)).toEqual([<p>b</p>])
  })

})

const TestComponent = ({children}) => (<React.Fragment>{children}</React.Fragment>) // need this because shallow renderer does not accept primitive component types susch <div></div>

describe('child', () => {
  let render, child

  beforeEach( () => {
    ({render, child} = createShallowRenderer())
  })

  it('returns undefined if the child does not exist', () => {
    render(<TestComponent />)
    expect(child(0)).not.toBeDefined()
  })

  it('returns child of rendered elements', () => {
    
    render(<TestComponent>
      <p>a</p>
      <p>b</p>
    </TestComponent>)

    expect(child(1)).toEqual(<p>b</p>)
  })

})

describe('elementsMatching', () => {
  let render, elementsMatching, firstElementMatching

  beforeEach( () => {
    ({render, elementsMatching, firstElementMatching} = createShallowRenderer())
  }) 

  it('finds multiple direct children', () => {
    render(
      <TestComponent>
        <p>a</p>
        <p>b</p>
      </TestComponent>
    )

    expect(elementsMatching(type('p')))
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

    expect(elementsMatching(type('p'))).toEqual([<p>a</p>])

  })

  it('find first direct children', () => {
    render(
      <TestComponent>
        <div>
           <p>a</p>
        </div>
        <p><div>b</div></p>
        <p><div>c</div></p>
      </TestComponent>
    )

    expect(firstElementMatching(type('p'))).toEqual(<p>a</p>)
  })

})