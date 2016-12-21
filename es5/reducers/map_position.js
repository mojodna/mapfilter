'use strict';

var assign = require('object-assign');

var mapPosition = function mapPosition() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case 'MOVE_MAP':
      return assign({}, state, action.payload);
    default:
      return state;
  }
};

module.exports = mapPosition;