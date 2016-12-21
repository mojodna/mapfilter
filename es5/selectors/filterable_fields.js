'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('reselect'),
    createSelector = _require.createSelector;

var getFieldAnalysis = require('./field_analysis');

var _require2 = require('../constants'),
    FILTER_TYPES = _require2.FILTER_TYPES;

var getFilterableFields = createSelector(getFieldAnalysis, function (fieldStats) {
    return (0, _entries2.default)(fieldStats).filter(function (_ref) {
        var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        return v.filterType === FILTER_TYPES.DATE || v.filterType === FILTER_TYPES.DISCRETE;
    }).map(function (_ref3) {
        var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
            k = _ref4[0],
            v = _ref4[1];

        return k;
    });
});

module.exports = getFilterableFields;