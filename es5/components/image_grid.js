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
var PropTypes = React.PropTypes;

var _require = require('react-virtualized'),
    Grid = _require.Grid,
    AutoSizer = _require.AutoSizer;

var getScrollBarWidth = require('get-scrollbar-width');
var assign = require('object-assign');

require('insert-css')('.ReactVirtualized__Table__headerRow{font-weight:700;text-transform:uppercase;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}.ReactVirtualized__Table__row{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}.ReactVirtualized__Table__headerTruncatedText{display:inline-block;max-width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}.ReactVirtualized__Table__headerColumn,.ReactVirtualized__Table__rowColumn{margin-right:10px;min-width:0px;}.ReactVirtualized__Table__rowColumn{text-overflow:ellipsis;white-space:nowrap;}.ReactVirtualized__Table__headerColumn:first-of-type,.ReactVirtualized__Table__rowColumn:first-of-type{margin-left:10px;}.ReactVirtualized__Table__sortableHeaderColumn{cursor:pointer;}.ReactVirtualized__Table__sortableHeaderIconContainer{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}.ReactVirtualized__Table__sortableHeaderIcon{-webkit-box-flex:0;-ms-flex:0 0 24px;flex:0 0 24px;height:1em;width:1em;fill:currentColor;}');

var pixelRatio = window.devicePixelRatio || 1;

var styles = {
  image: {
    border: '1px solid white',
    boxSizing: 'border-box',
    display: 'block',
    height: '100%',
    objectFit: 'cover',
    width: '100%',
    cursor: 'pointer',
    backgroundColor: 'rgb(240, 240, 240)'
  }
};

var ImageGrid = function (_React$Component) {
  (0, _inherits3.default)(ImageGrid, _React$Component);

  function ImageGrid() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ImageGrid);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ImageGrid.__proto__ || (0, _getPrototypeOf2.default)(ImageGrid)).call.apply(_ref, [this].concat(args))), _this), _this._renderCell = function (width, _ref2) {
      var columnIndex = _ref2.columnIndex,
          rowIndex = _ref2.rowIndex,
          key = _ref2.key,
          style = _ref2.style;
      var _this$props = _this.props,
          images = _this$props.images,
          thumbSize = _this$props.thumbSize;

      var columnsCount = Math.floor(width / thumbSize);
      var image = images[rowIndex * columnsCount + columnIndex];
      if (!image) return;
      var url = 'http://resizer.digital-democracy.org/' + thumbSize * pixelRatio + '/' + image.url;
      return React.createElement('img', {
        src: url,
        key: key,
        style: assign({}, styles.image, style),
        onClick: _this.handleImageClick.bind(_this, image.featureId)
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ImageGrid, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.scrollbarWidth = getScrollBarWidth();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.images !== nextProps.images) {
        this.refs.grid && this.refs.grid.recomputeGridSize();
      }
    }
  }, {
    key: 'handleImageClick',
    value: function handleImageClick(featureId) {
      this.props.onImageClick(featureId);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          images = _props.images,
          thumbSize = _props.thumbSize;


      return React.createElement(
        'div',
        { style: { flex: 3 } },
        React.createElement(
          AutoSizer,
          null,
          function (_ref3) {
            var height = _ref3.height,
                width = _ref3.width;

            var columnsCount = Math.floor(width / thumbSize);
            var rowsCount = Math.ceil(images.length / columnsCount);
            var cellSize = width / columnsCount;
            var overflow = cellSize * rowsCount > height;
            if (overflow && _this2.scrollbarWidth) {
              cellSize = (width - _this2.scrollbarWidth) / columnsCount;
            }
            return React.createElement(Grid, {
              ref: 'grid',
              columnCount: columnsCount,
              columnWidth: cellSize,
              height: height,
              cellRenderer: _this2._renderCell.bind(_this2, width),
              rowCount: rowsCount,
              rowHeight: cellSize,
              width: width
            });
          }
        )
      );
    }
  }]);
  return ImageGrid;
}(React.Component);

ImageGrid.propTypes = {
  images: PropTypes.array.isRequired,
  thumbSize: PropTypes.number.isRequired,
  onImageClick: PropTypes.func
};
ImageGrid.defaultProps = {
  thumbSize: 200
};


module.exports = ImageGrid;