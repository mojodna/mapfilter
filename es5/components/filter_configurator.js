'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _require = require('react-redux'),
    connect = _require.connect;

var PropTypes = React.PropTypes;

var _require2 = require('material-ui/Card'),
    Card = _require2.Card,
    CardText = _require2.CardText,
    CardHeader = _require2.CardHeader;

var IconButton = require('material-ui/IconButton').default;
var CloseIcon = require('material-ui/svg-icons/navigation/close').default;

var _require3 = require('material-ui/List'),
    List = _require3.List,
    ListItem = _require3.ListItem;

var Toggle = require('material-ui/Toggle').default;

var _require4 = require('react-intl'),
    defineMessages = _require4.defineMessages,
    FormattedMessage = _require4.FormattedMessage;

var getFilterableFields = require('../selectors/filterable_fields');
var getVisibleFilters = require('../selectors/visible_filters');

var _require5 = require('../action_creators'),
    removeFilter = _require5.removeFilter,
    updateVisibleFilters = _require5.updateVisibleFilters;

var msg = require('../util/intl_helpers').createMessage;

var styles = {
  card: {
    maxHeight: '100%',
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  cardContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    display: 'flex'
  },
  header: {
    lineHeight: '22px',
    boxSizing: 'content-box',
    borderBottom: '1px solid #cccccc'
  },
  icon: {
    float: 'right'
  },
  scrollable: {
    overflow: 'auto'
  }
};

var messages = defineMessages({
  configureFilters: {
    id: 'filter.configure',
    defaultMessage: 'Configure Filters',
    description: 'Dialog title text when displaying available filters'
  }
});

var FilterConfigurator = function (_React$Component) {
  (0, _inherits3.default)(FilterConfigurator, _React$Component);

  function FilterConfigurator() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, FilterConfigurator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = FilterConfigurator.__proto__ || (0, _getPrototypeOf2.default)(FilterConfigurator)).call.apply(_ref, [this].concat(args))), _this), _this.onToggle = function (fieldName) {
      var _this$props = _this.props,
          onRemoveFilter = _this$props.onRemoveFilter,
          onUpdateVisibleFilters = _this$props.onUpdateVisibleFilters,
          visibleFilters = _this$props.visibleFilters;

      return function (_ref2) {
        var target = _ref2.target;

        var newVisibleFilters = void 0;

        if (target.checked) {
          newVisibleFilters = [].concat((0, _toConsumableArray3.default)(visibleFilters), [fieldName]);
        } else {
          var index = visibleFilters.indexOf(fieldName);
          newVisibleFilters = [].concat((0, _toConsumableArray3.default)(visibleFilters.slice(0, index)), (0, _toConsumableArray3.default)(visibleFilters.slice(index + 1)));

          onRemoveFilter(fieldName);
        }

        onUpdateVisibleFilters(newVisibleFilters);
      };
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(FilterConfigurator, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          filterableFields = _props.filterableFields,
          onCloseClick = _props.onCloseClick,
          visibleFilters = _props.visibleFilters;


      return React.createElement(
        Card,
        {
          style: styles.card,
          containerStyle: styles.cardContainerStyle,
          zDepth: 2 },
        React.createElement(
          CardHeader,
          {
            style: styles.header,
            title: React.createElement(
              'h3',
              { style: styles.title },
              React.createElement(FormattedMessage, messages.configureFilters)
            ) },
          React.createElement(
            IconButton,
            { style: styles.icon, onTouchTap: onCloseClick },
            React.createElement(CloseIcon, null)
          )
        ),
        React.createElement(
          CardText,
          { style: styles.scrollable },
          React.createElement(
            List,
            null,
            filterableFields.map(function (field) {
              return React.createElement(ListItem, {
                key: field,
                primaryText: React.createElement(FormattedMessage, msg('field_key')(field)),
                rightToggle: React.createElement(Toggle, {
                  toggled: visibleFilters.includes(field),
                  onToggle: _this2.onToggle(field)
                })
              });
            })
          )
        )
      );
    }
  }]);
  return FilterConfigurator;
}(React.Component);

FilterConfigurator.propTypes = {
  filterableFields: PropTypes.array.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  onRemoveFilter: PropTypes.func.isRequired,
  onUpdateVisibleFilters: PropTypes.func.isRequired,
  visibleFilters: PropTypes.array.isRequired
};


function mapStateToProps(state) {
  return {
    filterableFields: getFilterableFields(state),
    visibleFilters: getVisibleFilters(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onRemoveFilter: function onRemoveFilter(filter) {
      return dispatch(removeFilter(filter));
    },
    onUpdateVisibleFilters: function onUpdateVisibleFilters(filters) {
      return dispatch(updateVisibleFilters(filters));
    }
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(FilterConfigurator);