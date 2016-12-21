'use strict';

var _require = require('reselect'),
    createSelector = _require.createSelector;

var getFlattenedFeatures = require('./flattened_features');

var getFeaturesById = createSelector(getFlattenedFeatures, function (features) {
  return features.reduce(function (p, v) {
    p[v.id] = v;
    return p;
  }, {});
});

module.exports = getFeaturesById;