'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('reselect'),
    createSelector = _require.createSelector;

var getFieldAnalysis = require('./field_analysis');
var getRawFilteredFeatures = require('./filtered_features_raw');

var _require2 = require('../constants'),
    FIELD_TYPES = _require2.FIELD_TYPES;

var getImageFieldNames = createSelector(getFieldAnalysis, function (fieldAnalysis) {
  return (0, _keys2.default)(fieldAnalysis).filter(function (fieldname) {
    return fieldAnalysis[fieldname].type === FIELD_TYPES.IMAGE;
  });
});

var getImages = createSelector(getRawFilteredFeatures, getImageFieldNames, function (features, imageFieldNames) {
  return features.reduce(function (p, feature) {
    imageFieldNames.forEach(function (f) {
      if (feature.properties[f]) {
        p.push({
          url: feature.properties[f],
          featureId: feature.id
        });
      }
    });
    return p;
  }, []);
});

module.exports = getImages;