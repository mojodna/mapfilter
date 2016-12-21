'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var PropTypes = React.PropTypes;

var pure = require('recompose/pure').default;
var Link = require('react-router/Link').default;

var _require = require('material-ui/List'),
    List = _require.List,
    ListItem = _require.ListItem;

var Divider = require('material-ui/Divider').default;
var SettingsIcon = require('material-ui/svg-icons/action/settings').default;

var _require2 = require('react-intl'),
    defineMessages = _require2.defineMessages,
    FormattedMessage = _require2.FormattedMessage;

var DiscreteFilter = require('./discrete_filter');
var DateFilter = require('./date_filter');

var _require3 = require('../constants'),
    FILTER_TYPES = _require3.FILTER_TYPES;

var style = {
  outer: {
    minWidth: 300,
    maxWidth: '33%',
    overflowY: 'auto',
    zIndex: 1,
    boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
  },
  list: {
    paddingTop: 0
  },
  listItemInner: {
    padding: 0
  },
  listIcon: {
    fill: 'rgb(117, 117, 117)',
    left: 0,
    top: 0,
    margin: '12px',
    position: 'absolute'
  },
  link: {
    color: '#000',
    display: 'block',
    padding: '16px 16px 16px 48px',
    textDecoration: 'none'
  }
};

var messages = defineMessages({
  changeFilters: {
    id: 'filter.change',
    defaultMessage: 'Change Filters…',
    description: 'Button text to change which fields are shown and filterable in the filter pane'
  }
});

var Filter = function Filter(_ref) {
  var _ref$configureFilters = _ref.configureFilters,
      configureFilters = _ref$configureFilters === undefined ? false : _ref$configureFilters,
      _ref$filters = _ref.filters,
      filters = _ref$filters === undefined ? {} : _ref$filters,
      _ref$fieldStats = _ref.fieldStats,
      fieldStats = _ref$fieldStats === undefined ? {} : _ref$fieldStats,
      _ref$visibleFilters = _ref.visibleFilters,
      visibleFilters = _ref$visibleFilters === undefined ? [] : _ref$visibleFilters,
      location = _ref.location,
      _ref$onUpdateFilter = _ref.onUpdateFilter,
      onUpdateFilter = _ref$onUpdateFilter === undefined ? function (x) {
    return x;
  } : _ref$onUpdateFilter;
  return React.createElement(
    'div',
    { className: 'filter', style: style.outer },
    React.createElement(
      List,
      { style: style.list },
      visibleFilters.map(function (f) {
        var field = fieldStats[f];
        var filter = filters[f];
        switch (field.filterType) {
          case FILTER_TYPES.DISCRETE:
            return React.createElement(
              'div',
              { key: f },
              React.createElement(DiscreteFilter, {
                fieldName: f,
                checked: filter ? filter.in : (0, _keys2.default)(field.values),
                values: field.values,
                onUpdate: onUpdateFilter }),
              React.createElement(Divider, null)
            );
          case FILTER_TYPES.RANGE:
            return;
          case FILTER_TYPES.DATE:
            return React.createElement(
              'div',
              { key: f },
              React.createElement(DateFilter, {
                fieldName: f,
                filter: filter,
                min: filter ? filter['>='] : field.valueStats.min,
                max: filter ? filter['<='] : field.valueStats.max,
                valueMin: field.valueStats.min,
                valueMax: field.valueStats.max,
                onUpdate: onUpdateFilter }),
              React.createElement(Divider, null)
            );
        }
      }),
      React.createElement(
        ListItem,
        { innerDivStyle: style.listItemInner },
        React.createElement(
          Link,
          {
            style: style.link,
            to: {
              pathname: location.pathname + '/settings/filters',
              query: location.query
            } },
          React.createElement(FormattedMessage, messages.changeFilters),
          ' ',
          React.createElement(SettingsIcon, { style: style.listIcon })
        )
      )
    )
  );
};

Filter.propTypes = {
  configureFilters: PropTypes.bool,
  filters: PropTypes.object,
  fieldStats: PropTypes.object.isRequired,
  visibleFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  location: PropTypes.object.isRequired,
  /* called with valid mapbox-gl filter when updated */
  onUpdateFilter: PropTypes.func
};

module.exports = pure(Filter);