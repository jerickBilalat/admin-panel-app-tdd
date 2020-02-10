import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
export const getChildrenOf = element => {
  if( typeof element === 'string') return []
  
  if(!element.props.children) {
    return []
  }

  if( typeof element.props.children === 'string') return [element.props.children]

  

  if( Array.isArray(element.props.children) )return element.props.children

  return [element.props.children]


}


const getAllElementsMatching = (element, matcherFn) => {
  //if element is matching
  if(matcherFn(element)) return [element]
  // eles get children of element and return element that are matching
  return getChildrenOf(element).reduce((acc, child) => [...acc, ...getAllElementsMatching(child, matcherFn)], [])
}
export const createShallowRenderer = () => {
  let renderer = new ShallowRenderer()

  return {
    render: component => renderer.render(component),
    logOutput: () => console.log(renderer.getRenderOutput()),
    getNthChild: n => getChildrenOf(renderer.getRenderOutput())[n],
    getAllElementsMatching: matcherFn => getAllElementsMatching(renderer.getRenderOutput(), matcherFn),
    getFirstElementMatching: matcherFn => { return getAllElementsMatching(renderer.getRenderOutput(), matcherFn)[0]}
  }
}

export const type = typeName => element => element.type === typeName
export const id = id => element => element.props && element.props.id === id
export const className = className => element => element && element.props && element.props.className === className
export const click = element => element.props.onClick()