'use strict';

var visibleFilters = function visibleFilters() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var _ref = arguments[1];
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case 'UPDATE_VISIBLE_FILTERS':
      return payload;

    default:
      return state;
  }
};

module.exports = visibleFilters;