"use strict";

var defaultFields = {
  media: null,
  title: null,
  subtitle: null,
  color: null
};

var fieldMapping = function fieldMapping() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultFields;

  return state;
};

module.exports = fieldMapping;