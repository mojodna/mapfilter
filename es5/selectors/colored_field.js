'use strict';

var getBestFilterFields = require('./best_fields');

/**
 * If we have not configured a field to color, then use the
 * a guess at the best field to use for filtering
 */
var getColoredFieldName = function getColoredFieldName(state) {
  if (state.fieldMapping.color) {
    return state.fieldMapping.color;
  } else {
    var bestFilterFields = getBestFilterFields(state);
    return bestFilterFields[0] && bestFilterFields[0].fieldname;
  }
};

module.exports = getColoredFieldName;