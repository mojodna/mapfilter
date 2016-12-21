'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var shouldPureComponentUpdate = require('react-pure-render/function');
var makePure = require('recompose/pure').default;
var Checkbox = makePure(require('material-ui/Checkbox').default);
var ListIcon = require('material-ui/svg-icons/action/list').default;

var _require = require('material-ui/List'),
    ListItem = _require.ListItem;

var _require2 = require('react-intl'),
    FormattedMessage = _require2.FormattedMessage;

var omit = require('lodash/omit');

var ShowAllButton = require('./show_all_button');
var OnlyButton = require('./only_button');
var msg = require('../util/intl_helpers').createMessage;

var _require3 = require('../styles'),
    listStyles = _require3.listStyles;

var styles = {
  checkbox: {
    marginBottom: 8,
    fontSize: 14
  },
  checkboxLabel: {
    lineHeight: '22px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  checkboxIcon: {
    width: 20,
    height: 20,
    marginRight: 14
  }
};

// Material-ui passes a `nestedLevel` prop to nested items.
// We're not using a `div` instead of the material-ui component for
// nested items, so we need to remove the `nestedLevel` prop.
var NestedItem = function NestedItem(props) {
  var divProps = omit(props, ['nestedLevel', 'children']);
  return React.createElement(
    'div',
    divProps,
    props.children
  );
};

var DiscreteFilter = function (_React$Component) {
  (0, _inherits3.default)(DiscreteFilter, _React$Component);

  function DiscreteFilter() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DiscreteFilter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DiscreteFilter.__proto__ || (0, _getPrototypeOf2.default)(DiscreteFilter)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.shouldComponentUpdate = shouldPureComponentUpdate, _this.showAll = function (e) {
      e.preventDefault();
      _this.props.onUpdate({
        exp: 'in',
        key: _this.props.fieldName,
        val: null
      });
    }, _this.handleCheck = function (e) {
      var v = e.target.value;
      var checked = _this.props.checked.slice(0);
      if (e.target.checked && checked.indexOf(v) === -1) {
        checked.push(v);
      } else if (!e.target.checked && checked.indexOf(v) > -1) {
        checked.splice(checked.indexOf(v), 1);
      }
      _this.props.onUpdate({
        exp: 'in',
        key: _this.props.fieldName,
        val: checked
      });
    }, _this.handleMouseLeave = function () {
      _this.setState({ hovered: false });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DiscreteFilter, [{
    key: 'handleOnlyClick',
    value: function handleOnlyClick(key, e) {
      e.preventDefault();
      this.props.onUpdate({
        exp: 'in',
        key: this.props.fieldName,
        val: [key]
      });
    }
  }, {
    key: 'handleMouseEnter',
    value: function handleMouseEnter(key) {
      this.setState({ hovered: key });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          fieldName = _props.fieldName,
          checked = _props.checked,
          values = _props.values;

      var isFiltered = checked.length < (0, _keys2.default)(values).length;
      return React.createElement(ListItem, {
        innerDivStyle: listStyles.listItemInner,
        primaryText: React.createElement(FormattedMessage, msg('field_key')(fieldName)),
        leftIcon: React.createElement(ListIcon, { style: listStyles.listIcon }),
        initiallyOpen: true,
        disabled: true,
        rightIconButton: isFiltered ? React.createElement(ShowAllButton, { onTouchTap: this.showAll }) : null,
        nestedListStyle: listStyles.nestedList,
        nestedItems: (0, _keys2.default)(values).map(function (v) {
          return React.createElement(
            NestedItem,
            {
              key: v,
              style: { position: 'relative' },
              onMouseEnter: _this2.handleMouseEnter.bind(_this2, v),
              onMouseLeave: _this2.handleMouseLeave },
            React.createElement(Checkbox, {
              label: React.createElement(FormattedMessage, msg('field_value')(v)),
              title: React.createElement(FormattedMessage, msg('field_value')(v)),
              value: v,
              style: styles.checkbox,
              iconStyle: styles.checkboxIcon,
              labelStyle: styles.checkboxLabel,
              checked: checked.indexOf(v) > -1,
              onCheck: _this2.handleCheck,
              disableFocusRipple: true,
              disableTouchRipple: true }),
            _this2.state.hovered === v && React.createElement(OnlyButton, {
              onTouchTap: _this2.handleOnlyClick.bind(_this2, v) })
          );
        })
      });
    }
  }]);
  return DiscreteFilter;
}(React.Component);

DiscreteFilter.propTypes = {
  fieldName: PropTypes.string.isRequired,
  checked: PropTypes.array,
  values: PropTypes.objectOf(PropTypes.number),
  onUpdate: PropTypes.func
};
DiscreteFilter.defaultProps = {
  checked: [],
  onUpdate: function onUpdate(x) {
    return x;
  }
};


module.exports = DiscreteFilter;