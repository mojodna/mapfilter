'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assign = require('object-assign');
var omit = require('lodash/omit');

/**
 * Filter state is an object with whose properties are field names
 * that have filters set, and values are objects whose properties
 * are expressions, values arrays of expression arguments, e.g.
 * state.filter = {
 *   happening: {
 *     in: ['mining', 'fishing']
 *   },
 *   today: {
 *     '>=': 1415692800000,
 *     '<=': 1418198400000
 *   }
 * }
 * The only operator logic for combining filters that we support currently
 * is "all". These simplified filters are converted to the syntax used by
 * Mapbox https://www.mapbox.com/mapbox-gl-style-spec/#types-filter in
 * the selector selectors/mapbox_filter.js
 */
var filters = function filters() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref = arguments[1];
  var type = _ref.type,
      _ref$payload = _ref.payload,
      payload = _ref$payload === undefined ? {} : _ref$payload;
  var key = payload.key,
      exp = payload.exp,
      val = payload.val;

  switch (type) {
    case 'UPDATE_FILTER':
      var filter = void 0;

      if (!val) {
        filter = omit(state[key], exp);
        if (!(0, _keys2.default)(filter).length) {
          return omit(state, key);
        }
      } else {
        filter = assign({}, state[key], (0, _defineProperty3.default)({}, exp, val));
      }

      return assign({}, state, (0, _defineProperty3.default)({}, key, filter));

    case 'REMOVE_FILTER':
      return omit(state, payload);

    default:
      return state;
  }
};

module.exports = filters;