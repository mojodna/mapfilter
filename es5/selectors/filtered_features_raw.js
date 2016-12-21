'use strict';

var ff = require('feature-filter-geojson');

var _require = require('reselect'),
    createSelector = _require.createSelector;

var getFilterableFeatures = require('./filterable_features');
var getMapboxFilter = require('./mapbox_filter');

var getRawFilteredFeatures = createSelector(getFilterableFeatures, getMapboxFilter, function (features, filter) {
  return features.filter(ff(filter));
});

module.exports = getRawFilteredFeatures;