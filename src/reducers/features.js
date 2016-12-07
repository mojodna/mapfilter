const fs = require('fs')
const path = require('path')

const getFlattenedFeatures = require('../selectors/flattened_features')
const getLabeledFeatures = require('../selectors/labeled_features')

/**
 * Attempt to parse a datestring, returning `false` if it can't be parsed
 * @param {string} possibleDate [description]
 * @return {date|boolean} returns a Date object or `false` if not a date.
 */
function reviveDate (k, v) {
  if (typeof v !== 'string') return v
  var date = new Date(v)
  if (isNaN(date)) return v
  return date
}

const markersJson = fs.readFileSync(path.join(__dirname, '/../../statics/sample.geojson'), 'utf8')
const markers = getLabeledFeatures(getFlattenedFeatures(JSON.parse(markersJson, reviveDate)))

const features = (state = markers, action) => {
  switch (action.type) {
    case 'ADD_FEATURES':
      return [...state, ...action.payload]
    case 'REPLACE_FEATURES':
      return getLabeledFeatures(getFlattenedFeatures(action.payload))
  }
  return state
}

module.exports = features
