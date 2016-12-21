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

var _require = require('material-ui/Table'),
    Table = _require.Table,
    TableBody = _require.TableBody,
    TableRow = _require.TableRow,
    TableRowColumn = _require.TableRowColumn;

var _require2 = require('react-intl'),
    FormattedMessage = _require2.FormattedMessage;

var assign = require('object-assign');
var msg = require('../util/intl_helpers').createMessage;

var styles = {
  firstColumn: {
    fontWeight: 'bold'
  }
};

var FeatureTable = function (_React$Component) {
  (0, _inherits3.default)(FeatureTable, _React$Component);

  function FeatureTable() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, FeatureTable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = FeatureTable.__proto__ || (0, _getPrototypeOf2.default)(FeatureTable)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      width: '50%'
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(FeatureTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.autoFitColumn();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.data !== prevProps.data) {
        this.autoFitColumn();
      }
    }
  }, {
    key: 'autoFitColumn',
    value: function autoFitColumn() {
      var _this2 = this;

      var width = 0;
      this.props.data.forEach(function (row) {
        var rowEl = ReactDOM.findDOMNode(_this2.refs[row.key]);
        width = Math.max(width, rowEl.offsetWidth);
      });
      this.setState({
        width: width
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var data = this.props.data;

      return React.createElement(
        Table,
        { selectable: false },
        React.createElement(
          TableBody,
          { displayRowCheckbox: false, preScanRows: false },
          data.map(function (row, i) {
            return React.createElement(
              TableRow,
              { key: row.key },
              React.createElement(
                TableRowColumn,
                { ref: '__td' + i, style: assign({}, styles.firstColumn, { width: _this3.state.width }) },
                React.createElement(
                  'span',
                  { ref: row.key },
                  React.createElement(FormattedMessage, msg('field_key')(row.key))
                )
              ),
              React.createElement(
                TableRowColumn,
                null,
                React.createElement(FormattedMessage, msg('field_value')(row.value))
              )
            );
          })
        )
      );
    }
  }]);
  return FeatureTable;
}(React.Component);

FeatureTable.defaultProps = {
  data: []
};


module.exports = FeatureTable;