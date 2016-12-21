'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var flat = require('flat');

var _require = require('reselect'),
    createSelector = _require.createSelector;

var getFeaturesWithIds = require('./features_with_ids');
var getFieldAnalysis = require('./field_analysis');
var getIdFieldNames = require('./id_fields');

var _require2 = require('../constants'),
    FIELD_TYPES = _require2.FIELD_TYPES;

function dateStringToNumber(dateString) {
  return +new Date(dateString);
}

var getFilterableFeatures = createSelector(getFeaturesWithIds, getFieldAnalysis, getIdFieldNames, function (features, fieldAnalysis, idFieldNames) {
  return features.map(function (f) {
    // We can't filter nested objects or arrays, so we flatten feature properties
    var properties = flat(f.properties);
    // To filter dates we need to convert date strings to numbers
    (0, _keys2.default)(fieldAnalysis).filter(function (f) {
      return fieldAnalysis[f].type === FIELD_TYPES.DATE;
    }).forEach(function (f) {
      properties[f] = dateStringToNumber(properties[f]);
    });
    return (0, _assign2.default)({}, f, { properties: properties });
  });
});

module.exports = getFilterableFeatures;