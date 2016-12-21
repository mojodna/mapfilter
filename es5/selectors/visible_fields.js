'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _isInterestingField;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('reselect'),
    createSelector = _require.createSelector;

var getFieldAnalysis = require('./field_analysis');

var _require2 = require('../constants'),
    FIELD_TYPES = _require2.FIELD_TYPES;

var isInterestingField = (_isInterestingField = {}, (0, _defineProperty3.default)(_isInterestingField, FIELD_TYPES.STRING, true), (0, _defineProperty3.default)(_isInterestingField, FIELD_TYPES.BOOLEAN, true), (0, _defineProperty3.default)(_isInterestingField, FIELD_TYPES.NUMBER, true), (0, _defineProperty3.default)(_isInterestingField, FIELD_TYPES.DATE, true), (0, _defineProperty3.default)(_isInterestingField, FIELD_TYPES.MIXED, true), _isInterestingField);

var getVisibleFields = createSelector(function (state) {
  return state.visibleFields && state.visibleFields.length && state.visibleFields;
}, getFieldAnalysis, function (visibleFields, fieldAnalysis) {
  if (visibleFields) return visibleFields;
  visibleFields = [];
  for (var fieldname in fieldAnalysis) {
    var fieldType = fieldAnalysis[fieldname].type;
    if (isInterestingField[fieldType]) visibleFields.push(fieldname);
  }
  return visibleFields;
});

module.exports = getVisibleFields;