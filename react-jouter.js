import React, { Component, PropTypes } from 'react'

export class ProvideRouter extends Component {
  constructor(props, context) {
    super(props, context)
    this.router = this.props.router
  }

  getChildContext() {
    return { router: this.router }
  }

  render() {
    return this.props.children
  }

  static propTypes = {
    router: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
  }

  static childContextTypes = {
    router: PropTypes.func.isRequired,
  }
}

export const route = (component) => {
  const wrapper = (props, context, ...args) => {
    const {handleEvent, go} = context.router
    const enhancedProps = { ...props, handleEvent, go }
    try {
      return component(enhancedProps, context, ...args)
    }
    catch (e) {
      // This is the only sane way to detect whether something is a constructor
      return new component(enhancedProps, context, ...args).render()
    }
  }

  wrapper.contextTypes = ProvideRouter.childContextTypes
  
  component.contextTypes = Object.assign(
    component.contextTypes || {},
    ProvideRouter.childContextTypes)
  
  return wrapper
}