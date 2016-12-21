'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('reselect'),
    createSelector = _require.createSelector;

var _require2 = require('../constants'),
    FIELD_TYPES = _require2.FIELD_TYPES;

var getFieldAnalysis = require('./field_analysis');

function isArrayLike(fieldType) {
  return [FIELD_TYPES.ARRAY, FIELD_TYPES.NUMBER_OR_ARRAY, FIELD_TYPES.STRING_OR_ARRAY].indexOf(fieldType) > -1;
}

/**
 * Builds a valid mapbox-gl filter expression our filters, which
 * are organized by key.
 * @example
 * ```
 * getMapboxFilter({foo: {in: ['bar', 'baz']}, qux: {'>=': 1, '<=': 3}})
 * // ['all', ['in', 'foo', bar', 'baz'], ['all', ['>=', 'qux', 1], ['<=', 'qux', 3]]]
 * ```
 * @param {object} filtersByField
 * @return {array} valid mapbox-gl filter
 */
var getMapboxFilter = createSelector(function (state) {
  return state.filters;
}, getFieldAnalysis, function (filters, fieldAnalysis) {
  return (0, _keys2.default)(filters).reduce(function (p, f) {
    var exp = filters[f];
    if (exp.in) {
      if (fieldAnalysis[f] && isArrayLike(fieldAnalysis[f].type)) {
        var subFilter = ['any', ['in', f].concat((0, _toConsumableArray3.default)(exp.in))];
        for (var i = 0; i < fieldAnalysis[f].maxArrayLength; i++) {
          subFilter.push(['in', f + '.' + i].concat((0, _toConsumableArray3.default)(exp.in)));
        }
        p.push(subFilter);
      } else {
        p.push(['in', f].concat((0, _toConsumableArray3.default)(exp.in)));
      }
    } else if (exp['<='] || exp['>=']) {
      var compoundExp = ['all'];
      if (exp['<=']) compoundExp.push(['<=', f, exp['<=']]);
      if (exp['>=']) compoundExp.push(['>=', f, exp['>=']]);
      p.push(compoundExp);
    }
    return p;
  }, ['all']);
});

module.exports = getMapboxFilter;