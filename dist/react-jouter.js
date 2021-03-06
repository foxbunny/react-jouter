(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react);
    global.reactJouter = mod.exports;
  }
})(this, function (exports, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.route = exports.ProvideRouter = undefined;

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var ProvideRouter = exports.ProvideRouter = function (_Component) {
    _inherits(ProvideRouter, _Component);

    function ProvideRouter(props, context) {
      _classCallCheck(this, ProvideRouter);

      var _this = _possibleConstructorReturn(this, (ProvideRouter.__proto__ || Object.getPrototypeOf(ProvideRouter)).call(this, props, context));

      _this.router = _this.props.router;
      return _this;
    }

    _createClass(ProvideRouter, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return { router: this.router };
      }
    }, {
      key: 'render',
      value: function render() {
        return this.props.children;
      }
    }]);

    return ProvideRouter;
  }(_react.Component);

  ProvideRouter.propTypes = {
    router: _react.PropTypes.func.isRequired,
    children: _react.PropTypes.element.isRequired
  };
  ProvideRouter.childContextTypes = {
    router: _react.PropTypes.func.isRequired
  };
  var route = exports.route = function route(component) {
    var wrapper = function wrapper(props, context) {
      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      var _context$router = context.router,
          handleEvent = _context$router.handleEvent,
          go = _context$router.go;

      var enhancedProps = _extends({}, props, { handleEvent: handleEvent, go: go });
      try {
        return component.apply(undefined, [enhancedProps, context].concat(args));
      } catch (e) {
        // This is the only sane way to detect whether something is a constructor
        return new (Function.prototype.bind.apply(component, [null].concat([enhancedProps, context], args)))().render();
      }
    };

    wrapper.contextTypes = ProvideRouter.childContextTypes;

    component.contextTypes = Object.assign(component.contextTypes || {}, ProvideRouter.childContextTypes);

    return wrapper;
  };
});
