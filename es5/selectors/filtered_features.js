'use strict';

var _require = require('reselect'),
    createSelector = _require.createSelector;

var assign = require('object-assign');

var getFeaturesById = require('./features_by_id');
var getRawFilteredFeatures = require('./filtered_features_raw');
var getColorIndex = require('./color_index');
var getColoredField = require('./colored_field');
var CONFIG = require('../../config.json');

var getFilteredFeatures = createSelector(getFeaturesById, getRawFilteredFeatures, getColoredField, getColorIndex, function (featuresById, filteredFeatures, colorIndex, coloredField) {
  return filteredFeatures.map(function (f, i) {
    return assign({}, featuresById[f.id], {
      __label: CONFIG.labelChars.charAt(i)
    });
  });
});

module.exports = getFilteredFeatures;