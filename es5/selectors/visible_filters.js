'use strict';

var _require = require('reselect'),
    createSelector = _require.createSelector;

var intersect = require('lodash/intersection');

var getBestFilterFields = require('./best_fields');
var getFieldAnalysis = require('./field_analysis');
var getFilterableFields = require('./filterable_fields');
var getDateFieldName = require('./date_field');

/**
 * If we have not defined which fields to show filters for, make a best
 * guess by choosing the first date field we find, and the best filter
 * field (see `./best_field.js` for how this is guessed)
 */
var getVisibleFilters = createSelector(function (state) {
  return state.visibleFilters;
}, getBestFilterFields, getDateFieldName, getFilterableFields, function (visibleFilters, bestFilterFields, dateFieldName, filterableFields) {
  if (visibleFilters == null) {
    visibleFilters = [];
    if (dateFieldName) visibleFilters.push(dateFieldName);
    if (bestFilterFields[0]) visibleFilters.push(bestFilterFields[0].fieldname);

    return visibleFilters;
  }
  return intersect(visibleFilters, filterableFields);
});

module.exports = getVisibleFilters;