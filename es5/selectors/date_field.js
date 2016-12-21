'use strict';

var _require = require('reselect'),
    createSelector = _require.createSelector;

var getFieldAnalysis = require('./field_analysis');

var _require2 = require('../constants'),
    FIELD_TYPES = _require2.FIELD_TYPES;

/**
 * Pick the date field that appears in most records
 */


var getDateFieldName = createSelector(getFieldAnalysis, function (fieldAnalysis) {
  var dateField = void 0;
  for (var fieldname in fieldAnalysis) {
    var field = fieldAnalysis[fieldname];
    if (field.type !== FIELD_TYPES.DATE) continue;
    if (!dateField || field.count > dateField.count) {
      dateField = field;
    }
  }
  return dateField && dateField.fieldname;
});

module.exports = getDateFieldName;