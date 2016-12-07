const { createSelector } = require('reselect')

const LABEL_CHARS = require('../../config.json').labelChars

const getLabeledFeatures = createSelector(
  state => state,
  features => features.map((feature, i) => {
    const newProps = Object.assign({}, feature.properties)

    if (i < LABEL_CHARS.length) {
      newProps.__mf_label = LABEL_CHARS.charAt(i)
    }

    return Object.assign({}, feature, {
      properties: newProps
    })
  })
)

module.exports = getLabeledFeatures
