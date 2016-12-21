'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('reselect'),
    createSelector = _require.createSelector;

var getFilterableFeatures = require('./filterable_features');
var getRawFilteredFeatures = require('./filtered_features_raw');
var getColorIndex = require('./color_index');
var getColoredField = require('./colored_field');
var CONFIG = require('../../config.json');

var getMapGeoJSON = createSelector(getFilterableFeatures, getRawFilteredFeatures, getColoredField, getColorIndex, function (features, filteredFeatures, coloredField, colorIndex) {
  return {
    type: 'FeatureCollection',
    features: features.map(function (feature) {
      var props = feature.properties;
      var colorHex = colorIndex[props[coloredField] || props[coloredField + '.0']];
      var newProps = (0, _assign2.default)({}, props, {
        __mf_id: feature.id,
        __mf_color: (colorHex || CONFIG.defaultColor).slice(1),
        __mf_label: CONFIG.labelChars.charAt(filteredFeatures.indexOf(feature))
      });
      return (0, _assign2.default)({}, feature, {
        properties: newProps
      });
    })
  };
});

module.exports = getMapGeoJSON;