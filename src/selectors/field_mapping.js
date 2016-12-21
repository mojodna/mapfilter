const { createSelector } = require('reselect')

const getBestFilterFields = require('./best_fields')
const getFieldAnalysis = require('./field_analysis')
const getColoredFieldName = require('./colored_field')
const getDateFieldName = require('./date_field')
const getIdFieldNames = require('./id_fields')
const {FIELD_TYPES} = require('../constants')

const getTitleFieldName = createSelector(
  getBestFilterFields,
  getDateFieldName,
  getIdFieldNames,
  (bestFilterFields, dateFieldName, idFieldNames) => {
    return (bestFilterFields[0] && bestFilterFields[0].fieldname) ||
      dateFieldName || idFieldNames[0] || 'No Title'
  }
)

const getSubtitleFieldName = (state) => {
  const bestFilterFields = getBestFilterFields(state)
  return bestFilterFields[1] && bestFilterFields[1].fieldname
}

const getMediaFieldName = createSelector(
  getFieldAnalysis,
  (fieldAnalysis) => {
    let mediaField
    for (let fieldname in fieldAnalysis) {
      const field = fieldAnalysis[fieldname]
      if (field.type !== FIELD_TYPES.IMAGE && field.type !== FIELD_TYPES.VIDEO) continue
      if (!mediaField) {
        mediaField = field
        continue
      }
      const imageVsVideo = field.type === FIELD_TYPES.IMAGE &&
                           mediaField.type === FIELD_TYPES.VIDEO
      const higherCount = field.type === mediaField.type &&
                          field.count > mediaField.count
      if (imageVsVideo || higherCount) {
        mediaField = field
      }
    }
    return mediaField && mediaField.fieldname
  }
)

const getFieldMapping = createSelector(
  (state) => state.fieldMapping,
  getTitleFieldName,
  getSubtitleFieldName,
  getMediaFieldName,
  getColoredFieldName,
  (fieldMapping, titleFieldName, subtitleFieldName, mediaFieldName, coloredFieldName) => {
    return {
      title: fieldMapping.title || titleFieldName,
      subtitle: fieldMapping.subtitle || subtitleFieldName,
      media: fieldMapping.media || mediaFieldName,
      color: fieldMapping.color || coloredFieldName
    }
  }
)

module.exports = getFieldMapping
