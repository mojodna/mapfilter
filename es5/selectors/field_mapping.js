'use strict';

var _require = require('reselect'),
    createSelector = _require.createSelector;

var getBestFilterFields = require('./best_fields');
var getFieldAnalysis = require('./field_analysis');
var getColoredFieldName = require('./colored_field');
var getDateFieldName = require('./date_field');
var getIdFieldNames = require('./id_fields');

var _require2 = require('../constants'),
    FIELD_TYPES = _require2.FIELD_TYPES;

var getTitleFieldName = createSelector(getBestFilterFields, getDateFieldName, getIdFieldNames, function (bestFilterFields, dateFieldName, idFieldNames) {
  return bestFilterFields[0] && bestFilterFields[0].fieldname || dateFieldName || idFieldNames[0] || 'No Title';
});

var getSubtitleFieldName = function getSubtitleFieldName(state) {
  var bestFilterFields = getBestFilterFields(state);
  return bestFilterFields[1] && bestFilterFields[1].fieldname;
};

var getMediaFieldName = createSelector(getFieldAnalysis, function (fieldAnalysis) {
  var mediaField = void 0;
  for (var fieldname in fieldAnalysis) {
    var field = fieldAnalysis[fieldname];
    if (field.type !== FIELD_TYPES.IMAGE && field.type !== FIELD_TYPES.VIDEO) continue;
    if (!mediaField) {
      mediaField = field;
      continue;
    }
    var imageVsVideo = field.type === FIELD_TYPES.IMAGE && mediaField.type === FIELD_TYPES.VIDEO;
    var higherCount = field.type === mediaField.type && field.count > mediaField.count;
    if (imageVsVideo || higherCount) {
      mediaField = field;
    }
  }
  return mediaField && mediaField.fieldname;
});

var getFieldMapping = createSelector(function (state) {
  return state.fieldMapping;
}, getTitleFieldName, getSubtitleFieldName, getMediaFieldName, getColoredFieldName, function (fieldMapping, titleFieldName, subtitleFieldName, mediaFieldName, coloredFieldName) {
  return {
    title: fieldMapping.title || titleFieldName,
    subtitle: fieldMapping.subtitle || subtitleFieldName,
    media: fieldMapping.media || mediaFieldName,
    color: fieldMapping.color || coloredFieldName
  };
});

module.exports = getFieldMapping;