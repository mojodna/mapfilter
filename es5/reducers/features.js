'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var features = function features() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case 'ADD_FEATURES':
      return [].concat((0, _toConsumableArray3.default)(state), (0, _toConsumableArray3.default)(action.payload));
    case 'REPLACE_FEATURES':
      return action.payload;
  }
  return state;
};

module.exports = features;