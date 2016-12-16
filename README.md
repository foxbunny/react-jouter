# react-jouter

react-jouter provides a provider component for React-based applications that
gives child components access to the routing methods of a
[Jouter](https://github.com/foxbunny/jouter#readme) router object.

[![Build Status](https://travis-ci.org/foxbunny/react-jouter.svg?branch=master)](https://travis-ci.org/foxbunny/react-jouter)
[![codecov](https://codecov.io/gh/foxbunny/react-jouter/branch/master/graph/badge.svg)](https://codecov.io/gh/foxbunny/react-jouter)
[![npm version](https://badge.fury.io/js/react-jouter.svg)](https://badge.fury.io/js/react-jouter)

## Compatibility

react-jouter is tested against the latest version of React. It uses the
nearly-deprecated context API, however, and may become defunct or deprecated in
future. On the other hand,
[react-redux](https://github.com/reactjs/react-redux/) uses the same API, so,
for now, we will not worry aobut the future. ;-)

## Installation

react-jouter is written as an ES6 module. The compiled version is available in
the `dist` directory. It is compiled into an UMD module which can be used with
AMD and CommonJS module loaders, browserify, or as ES6 modules. It can also be
added using a `<script>` tag and accessed via the `reactJouter` global variable.

You can also install react-jouter using `npm`:

```shell
npm install --save react-jouter
```

## Basic usage

We won't go into too much detail on how to work with Jouter itself. Please refer 
to the [Jouter's README](https://github.com/foxbunny/jouter#readme) for its own 
documentation.

```javascript
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createRouter } from 'jouter'
import { RouterProvider, route } from 'react-jouter'

const router = jouter.createRouter()
// Add routes, etc
router.start()

// We wrap the component in route() call so it can access the
// router functions.
const Nav = route((props) =>
  <nav className="Nav">
    <a href="/" onClick={props.handleEvent}>Main</a>
    <a href="/about" onClick={props.handleEvent}>About</a>
    <a href="/user/login" onClick={props.handleEvent}>Login</a>
  </nav>
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <div className="App-content">
          Hello Jouter!
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  // We use ProvideRouter as a our root component and pass in
  // the router object as a prop.
  <ProvideRouter router={router}>
    <App />
  </ProvideRouter>
)
```

As can be seen from the example, we use the `route()` function to mark a
component as accepting router as part of the context. This introduces the
following changes:

* `context` object has a `router` property which is the router object that was
  passed to `ProvideRouter` component.
* `props.handleEvent(Event)` is made available. This is an event handler that
  will read the `href` attribute of the event target and, optionally, its
  `title` attribute (though this currently has no effet due to browser support
  issues), and causes the router to switch to the path in the `href` attribute.
* `props.go(path, [title])` is made available. This function changes the current
  path to the specified path. Title has no effect due to browser support issues.

## Using with Redux

The router will not do anything like switching views, and so on. This is entirely 
up to you. Since route handlers are completely decoupled from React, it may 
actually not be very easy. If you are asking yourself why anyone would want to 
use such an underpowered router library with React, the answer is Flux.

Jouter was meant to be used with Flux architecture, and Redux in particular. The 
route handler functions are completely separated from the components on purpose,
and only functions for switching routes are made available to the components.

In a React-Redux application, Jouter's role is to modify application state based
on active routes. However, router does not even have access to `store.dispatch()` 
by default. This is also intentional. Jouter is a generic router, so it doesn't
do anything React- or Redux-specific. To make Jouter work with Redux, we need
one more little thing.

```javascript
import Redux from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createRouter } from 'jouter'
import { ProvideRouter } from 'react-jouter'

import { viewReducer } from './reducers'
import { viewSwitch } from './route-handlers'

import App from './App'

const store = createStore(viewReducer, {view: 'main'})

// The secret sauce:
const decorator = routeHandler =>
  // Inject store.dispatch into all route handlers' arguments
  (...args) => routeHandler(store.dispatch.bind(store), ...args)

const router = createRouter({decorate: decorator})
router.add(viewSwitch, /\/(?:([^/]+)\/.*)?/)
// Add other application-specific routes
router.start()

ReactDOM.render(
  <Provider store={store}>
    <ProvideRouter router={router}>
      <App />
    </ProvideRouter>
  </Provider>
)
```

In the above example, we have a `viewSwitch()` route handler, which will use the
captured path segment to dispatch an action to change the view value in the
store. Well, imagine that it does because I won't be showing you the code here.

The decorator function is passed to the `createRouter()` function so that all 
route handlers will have access to the store's `dispatch()` function so that 
the action can be dispatched.

The rest is exactly the same as in the first example.

## Getting the sources

The react-jouter sources are hosted [on
GitHub](https://github.com/foxbunny/react-jouter). If you like it, don't forget
to stop by and star it!

## Reporting issues

If you need to report an issue or request a new feature, please use the [GitHub
issue tracker](https://github.com/foxbunny/jouter/issues).

## License

Jouter is licensed under the MIT license. See the `LICENSE` file for more
information.