import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
export const childrenOf = element => {
  if( typeof element === 'string') return []
  
  if(!element.props.children) {
    return []
  }

  if( typeof element.props.children === 'string') return [element.props.children]

  

  if( Array.isArray(element.props.children) )return element.props.children

  return [element.props.children]


}


const elementsMatching = (element, matcherFn) => {
  //if element is matching
  if(matcherFn(element)) return [element]

  // eles get children of element and return element that are matching
  return childrenOf(element).reduce((acc, child) => [...acc, ...elementsMatching(child, matcherFn)], [])
}
export const createShallowRenderer = () => {
  let renderer = new ShallowRenderer()

  return {
    render: component => renderer.render(component),
    child: n => childrenOf(renderer.getRenderOutput())[n],
    elementsMatching: matcherFn => elementsMatching(renderer.getRenderOutput(), matcherFn),
    firstElementMatching: matcherFn => elementsMatching(renderer.getRenderOutput(), matcherFn)[0]
  }
}

export const type = typeName => element => element.type === typeName
export const id = id => element => element.props && element.props.id === id
export const className = className => element => element.props && element.props.className === className
export const click = element => element.props.onClick()