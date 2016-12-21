'use strict';

var mapStyles = function mapStyles() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var _ref = arguments[1];
  var type = _ref.type,
      _ref$payload = _ref.payload,
      payload = _ref$payload === undefined ? {} : _ref$payload;

  switch (type) {
    case 'REPLACE_MAP_STYLE':
      return payload;

    default:
      return state;
  }
};

module.exports = mapStyles;