'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var union = require('lodash/union');
var pick = require('lodash/pick');

var _require = require('reselect'),
    createSelector = _require.createSelector;

var getFieldAnalysis = require('./field_analysis');
var getVisibleFilters = require('./visible_filters');

// We're only interested in filters that apply to keys that
// actually exist in our data
var getFilters = createSelector(function (state) {
  return state.filters;
}, getFieldAnalysis, function (filters, fieldStats) {
  return pick(filters, (0, _keys2.default)(fieldStats));
});

// We should always show filters for any fields that
// are in the current filter
var getMergedFilterFields = createSelector(getVisibleFilters, getFilters, function (visibleFilters, filters) {
  return union(visibleFilters, (0, _keys2.default)(filters));
});

var getFilterProps = createSelector(getFilters, getFieldAnalysis, getMergedFilterFields, function (filters, fieldStats, visibleFilters) {
  return {
    filters: filters,
    fieldStats: fieldStats,
    visibleFilters: visibleFilters
  };
});

module.exports = getFilterProps;