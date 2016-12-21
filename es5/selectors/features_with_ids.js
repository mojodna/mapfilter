'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('reselect'),
    createSelector = _require.createSelector;

var randomBytes = require('randombytes');

var getFieldAnalysis = require('./field_analysis');
var getIdFieldNames = require('./id_fields');

function uniqueId() {
  return randomBytes(8).toString('hex');
}

var getFeaturesWithIds = createSelector(function (state) {
  return state.features;
}, getFieldAnalysis, getIdFieldNames, function (features, fieldAnalysis, idFieldNames) {
  return features.map(function (f) {
    // We use an existing id feature property, if it is unique across all features,
    // or we use any unique id field we find under properties, or, failing that,
    // we generate a unique id.
    var id = fieldAnalysis.__validGeoJsonIdField ? f.id : f.properties[idFieldNames[0]] || uniqueId();
    return (0, _assign2.default)({}, f, { id: id });
  });
});

module.exports = getFeaturesWithIds;