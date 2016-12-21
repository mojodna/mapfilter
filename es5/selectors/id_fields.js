'use strict';

var _require = require('reselect'),
    createSelector = _require.createSelector;

var getFieldAnalysis = require('./field_analysis');

/**
 * Pick the id field that appears in most records
 */
var getIdFieldNames = createSelector(getFieldAnalysis, function (fieldAnalysis) {
  var idFields = [];
  for (var fieldname in fieldAnalysis) {
    var field = fieldAnalysis[fieldname];
    if (field.isUnique) idFields.push(field.fieldname);
  }
  return idFields;
});

module.exports = getIdFieldNames;