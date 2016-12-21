'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('reselect'),
    createSelector = _require.createSelector;

var getFieldAnalysis = require('./field_analysis');
var getColoredField = require('./colored_field');

var CONFIG = require('../../config.json');

var getColorIndex = createSelector(getColoredField, getFieldAnalysis, function (coloredField, fieldStats) {
  var colorIndex = {};
  if (!coloredField) return colorIndex;
  var values = (0, _keys2.default)(fieldStats[coloredField].values);
  if (!values) return colorIndex;
  values.forEach(function (v, i) {
    colorIndex[v] = CONFIG.colors[i] || CONFIG.defaultColor;
  });
  return colorIndex;
});

module.exports = getColorIndex;