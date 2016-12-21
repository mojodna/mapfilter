'use strict';

var _require = require('reselect'),
    createSelector = _require.createSelector;

var flat = require('flat');
var assign = require('object-assign');

var getFeaturesWithIds = require('./features_with_ids');
var getColorIndex = require('./color_index');
var getColoredField = require('./colored_field');
var CONFIG = require('../../config.json');

var getFlattenedFeatures = createSelector(getFeaturesWithIds, getColoredField, getColorIndex, function (features, coloredField, colorIndex) {
  return features.map(function (f) {
    var newProps = flat(f.properties, { safe: true });
    var colorHex = void 0;
    if (coloredField) {
      var coloredFieldValue = newProps[coloredField];
      colorHex = Array.isArray(coloredFieldValue) ? colorIndex[coloredFieldValue[0]] : colorIndex[coloredFieldValue];
    }
    return assign({}, f, {
      properties: newProps,
      __color: (colorHex || CONFIG.defaultColor).slice(1)
    });
  });
});

module.exports = getFlattenedFeatures;