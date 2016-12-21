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
var PropTypes = React.PropTypes;

var shouldPureComponentUpdate = require('react-pure-render/function');
var makePure = require('recompose/pure').default;
var DateIcon = require('material-ui/svg-icons/action/date-range').default;

var _require = require('material-ui/List'),
    ListItem = _require.ListItem;

var IconButton = require('material-ui/IconButton').default;
var EditIcon = require('material-ui/svg-icons/editor/mode-edit').default;

var _require2 = require('material-ui/Popover'),
    Popover = _require2.Popover,
    PopoverAnimationVertical = _require2.PopoverAnimationVertical;

var DateRange = makePure(require('react-date-range').DateRange);
var moment = require('moment');
var omit = require('lodash/omit');

var ShowAllButton = require('./show_all_button');

var _require3 = require('../util/text_helpers'),
    titleCase = _require3.titleCase;

var _require4 = require('../styles'),
    listStyles = _require4.listStyles;

var _require5 = require('../../config.json'),
    dateFormatShort = _require5.dateFormatShort;

var styles = {
  nestedList: {
    paddingTop: 0,
    paddingBottom: 0
  },
  dateItem: {
    marginLeft: 0,
    padding: '16px 56px 16px 16px',
    position: 'relative',
    fontSize: 14,
    lineHeight: '14px',
    color: 'rgba(0, 0, 0, 0.870588)'
  },
  iconButton: {
    padding: 12,
    width: 46,
    height: 46,
    top: 0,
    right: 4,
    background: 'none',
    position: 'absolute'
  },
  editIcon: {
    width: 20,
    height: 20
  },
  showAll: {
    fontSize: 12,
    lineHeight: '16px',
    height: 16,
    margin: '4px 0px 0px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
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

var DateFilter = function (_React$Component) {
  (0, _inherits3.default)(DateFilter, _React$Component);

  function DateFilter() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DateFilter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DateFilter.__proto__ || (0, _getPrototypeOf2.default)(DateFilter)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.shouldComponentUpdate = shouldPureComponentUpdate, _this.showDatePopover = function (event) {
      // This prevents ghost click.
      var target = _this.refs.dateRange;
      event.preventDefault();
      var range = document.createRange();
      var sel = window.getSelection();
      range.selectNodeContents(target);
      sel.removeAllRanges();
      sel.addRange(range);
      _this.setState({
        open: true,
        anchorEl: target
      });
    }, _this.handleNestedListToggle = function (e) {
      _this.setState({
        expanded: !_this.state.expanded
      });
    }, _this.showAllDates = function (e) {
      e.preventDefault();
      _this.handleDateChange({
        startDate: _this.props.valueMin,
        endDate: _this.props.valueMax
      });
    }, _this.handleDateChange = function (e) {
      if (e.startDate !== _this.props.startDate) {
        _this.props.onUpdate({
          exp: '>=',
          key: _this.props.fieldName,
          val: +e.startDate
        });
      }
      if (e.endDate !== _this.props.endDate) {
        _this.props.onUpdate({
          exp: '<=',
          key: _this.props.fieldName,
          val: +e.endDate
        });
      }
    }, _this.handleRequestClose = function () {
      _this.setState({
        open: false
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DateFilter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        el: ReactDOM.findDOMNode(this.refs.dateItem)
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          fieldName = _props.fieldName,
          min = _props.min,
          max = _props.max,
          valueMin = _props.valueMin,
          valueMax = _props.valueMax;

      var isFiltered = min > valueMin || max < valueMax;
      var minMoment = moment(min);
      var maxMoment = moment(max);
      var rangeStr = minMoment.format(dateFormatShort) + ' — ' + maxMoment.format(dateFormatShort);
      return React.createElement(ListItem, {
        innerDivStyle: listStyles.listItemInner,
        primaryText: titleCase(fieldName),
        leftIcon: React.createElement(DateIcon, { style: listStyles.listIcon }),
        initiallyOpen: true,
        rightIconButton: isFiltered ? React.createElement(ShowAllButton, { onTouchTap: this.showAllDates }) : null,
        disabled: true,
        ref: 'dateItem',
        nestedItems: [React.createElement(
          NestedItem,
          { style: styles.dateItem, key: 'dateItem' },
          React.createElement(
            'div',
            { ref: 'dateRange', onClick: this.showDatePopover },
            rangeStr
          ),
          React.createElement(
            IconButton,
            {
              onTouchTap: this.showDatePopover,
              tooltip: 'Select dates',
              style: styles.iconButton,
              iconStyle: styles.editIcon,
              tooltipPosition: 'bottom-left' },
            React.createElement(EditIcon, { color: '#757575' })
          ),
          React.createElement(
            Popover,
            {
              open: this.state.open,
              anchorEl: this.state.el,
              anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
              targetOrigin: { horizontal: 'left', vertical: 'top' },
              onRequestClose: this.handleRequestClose,
              animation: PopoverAnimationVertical
            },
            React.createElement(DateRange, {
              startDate: minMoment,
              endDate: maxMoment,
              onChange: this.handleDateChange })
          )
        )]
      });
    }
  }]);
  return DateFilter;
}(React.Component);

DateFilter.propTypes = {
  fieldName: PropTypes.string.isRequired,
  onUpdate: PropTypes.func
};


module.exports = DateFilter;