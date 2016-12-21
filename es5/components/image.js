'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var ReactDOM = require('react-dom');
var ImageLoader = require('react-imageloader');
var CircularProgress = require('material-ui/CircularProgress').default;
var omit = require('lodash/omit');
var assign = require('object-assign');

var styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(245, 245, 245)'
  }
};

var pixelRatio = window.devicePixelRatio || 1;

var createDiv = React.createElement.bind(null, 'div');

var Image = function (_React$Component) {
  (0, _inherits3.default)(Image, _React$Component);

  function Image() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Image);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Image.__proto__ || (0, _getPrototypeOf2.default)(Image)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Image, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          src = _props.src,
          useResizer = _props.useResizer;

      var mediaSrc = src;

      if (useResizer) {
        var el = ReactDOM.findDOMNode(this);
        var size = Math.max(el.offsetWidth, el.offsetHeight) * pixelRatio;
        mediaSrc = 'http://resizer.digital-democracy.org/' + roundUp(size) + '/' + src;
      }

      this.setState({
        src: mediaSrc,
        loadStart: Date.now()
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = omit(this.props, ['progress', 'src', 'style', 'useResizer']);
      var _props2 = this.props,
          style = _props2.style,
          progress = _props2.progress;


      return React.createElement(ImageLoader, {
        imgProps: assign({}, props, { style: style }),
        src: this.state.src,
        style: assign({}, styles.wrapper, style),
        preloader: function preloader() {
          return progress ? React.createElement(CircularProgress, null) : React.createElement('div', null);
        },
        wrapper: function wrapper(props, element) {
          var loadTime = Date.now() - _this2.state.loadStart;
          // Only fade in if image takes more than 200ms to load
          if (element.type !== 'img' || loadTime < 200) {
            return createDiv(props, element);
          } else {
            var mergedProps = assign({}, props, {
              className: 'fadeIn'
            });
            return createDiv(mergedProps, element);
          }
        }
      });
    }
  }]);
  return Image;
}(React.Component);

Image.defaultProps = {
  useResizer: false
};


module.exports = Image;

function roundUp(v) {
  return Math.ceil(v / 50) * 50;
}