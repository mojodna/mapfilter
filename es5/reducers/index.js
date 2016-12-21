'use strict';

var _require = require('react-intl-redux'),
    intlReducer = _require.intlReducer;

var _require2 = require('redux'),
    combineReducers = _require2.combineReducers;

module.exports = combineReducers({
  features: require('./features'),
  filters: require('./filters'),
  visibleFilters: require('./visible_filters'),
  mapPosition: require('./map_position'),
  mapStyle: require('./map_style'),
  fieldMapping: require('./field_mapping'),
  intl: intlReducer,
  xformUploader: require('./xform_uploader')
});