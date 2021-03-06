const toCase = require('case')
const roundTo = require('round-to')

const createMessage = section => value => {
  let msg
  let id
  if (typeof value === 'string') {
    if (value.indexOf('_') > -1 && value.indexOf(' ') < 0) {
      msg = toCase.capital(value)
    } else {
      msg = toSentenceCase(value)
    }
    id = value.replace(' ', '_').toLowerCase()
  } else if (Array.isArray(value)) {
    msg = value.map(v => roundTo(v, 5)).join(' ')
    id = value.join('_')
  } else {
    msg = value.toString()
    id = value.toString()
  }
  return {
    id: id,
    defaultMessage: msg
  }
}

/**
 * toCase.sentence() lower cases strings before turning to sentence case.
 * toSentenceCase() uses the same logic, but without lowercasing first.
 */
function toSentenceCase (s) {
  var sentenceRegExp = toCase._.re.sentence
  return s.replace(sentenceRegExp, function (m, prelude, letter) {
    return prelude + letter.toUpperCase()
  })
}

module.exports = {
  createMessage
}
