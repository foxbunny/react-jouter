import React, { Component } from 'react'
import { mount } from 'enzyme'
import { ProvideRouter, route } from './react-jouter'


describe('ProvideRouter', () => {
  it('will relay a router object in the child context', () => {
    const Child = (props, context) => {
      context.router.go('Hello!')
      return <span></span>
    }
    Child.contextTypes = ProvideRouter.childContextTypes
    
    const fauxRouter = () => { }
    fauxRouter.handleEvent = jest.fn()
    fauxRouter.go = jest.fn()
    
    const c = mount(<ProvideRouter router={fauxRouter}><Child /></ProvideRouter>)
    
    expect(fauxRouter.go).toHaveBeenCalledWith('Hello!')
  })
})

describe('route', () => {
  it('will decorate a component to accept router context', () => {
    const Child = route((props, context) => {
      props.handleEvent('Hello, handle!')
      props.go('Hello, go!')
      context.router('Hello, router!')
      return <span></span>
    })
    
    const fauxRouter = jest.fn()
    fauxRouter.handleEvent = jest.fn()
    fauxRouter.go = jest.fn()
    
    const c = mount(<ProvideRouter router={fauxRouter}><Child /></ProvideRouter>)
    
    expect(fauxRouter.handleEvent).toHaveBeenCalledWith('Hello, handle!')
    expect(fauxRouter.go).toHaveBeenCalledWith('Hello, go!')
    expect(fauxRouter).toHaveBeenCalledWith('Hello, router!')
  })

  it('will decorate a stateful component to accept router context', () => {
    class Child extends Component {
      render() {
        this.props.handleEvent('Hello, handle!')
        this.props.go('Hello, go!')
        return <span></span>
      }
    }
    
    const RoutedChild = route(Child)
    
    const fauxRouter = () => { }
    fauxRouter.handleEvent = jest.fn()
    fauxRouter.go = jest.fn()
    
    const c = mount(<ProvideRouter router={fauxRouter}><RoutedChild /></ProvideRouter>)
    
    expect(fauxRouter.handleEvent).toHaveBeenCalledWith('Hello, handle!')
    expect(fauxRouter.go).toHaveBeenCalledWith('Hello, go!')
  })
})