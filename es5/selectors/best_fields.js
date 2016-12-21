'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('reselect'),
    createSelector = _require.createSelector;

var getFieldAnalysis = require('./field_analysis');

var _require2 = require('../constants'),
    FILTER_TYPES = _require2.FILTER_TYPES;

function count(o) {
  return (0, _keys2.default)(o).length;
}

function getFeatureCount(state) {
  return state.features.count;
}

var createCompareFn = function createCompareFn(featureCount) {
  return function (a, b) {
    // If either field appears in less than 80% of features,
    // prefer the field that appears in more features
    var countThreshold = featureCount * 0.8;
    if (a.count < countThreshold || b.count < countThreshold) {
      return b.count - a.count;
    }

    // If one of the values is between 5 & 10, and the other isn't,
    // prefer the one that is.
    var aCountGood = count(a.values) >= 5; // && count(a.values) <= 10
    var bCountGood = count(b.values) >= 5; // && count(b.values) <= 10
    if (aCountGood && !bCountGood) return -1;
    if (bCountGood && !aCountGood) return 1;

    // Prefer fields with the least number of words
    return a.wordStats.mean - b.wordStats.mean;
  };
};

/**
 * Return a sorted list of the best fields to use for a filter
 */
var getBestFilterFields = createSelector(getFieldAnalysis, getFeatureCount, function (fieldAnalysis, featureCount) {
  var compareFn = createCompareFn(featureCount);
  var discreteFields = (0, _keys2.default)(fieldAnalysis).map(function (fieldname) {
    return fieldAnalysis[fieldname];
  }).filter(function (field) {
    return field.filterType === FILTER_TYPES.DISCRETE;
  });
  return discreteFields.sort(compareFn);
});

module.exports = getBestFilterFields;