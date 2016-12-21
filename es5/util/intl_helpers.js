'use strict';

var toCase = require('case');
var roundTo = require('round-to');

var createMessage = function createMessage(section) {
  return function formatMsg(value) {
    var msg = void 0;
    var id = void 0;
    if (typeof value === 'string') {
      if (value.indexOf('_') > -1 && value.indexOf(' ') < 0) {
        msg = toCase.capital(value);
      } else {
        msg = toSentenceCase(value);
      }
      id = value.replace(' ', '_').toLowerCase();
    } else if (Array.isArray(value)) {
      msg = value.map(function (v) {
        if (typeof v === 'number') return roundTo(v, 5);
        return formatMsg(v).defaultMessage;
      }).join(', ');
      id = value.join('_');
    } else {
      if (value == null) {
        msg = '';
        id = ' ';
      } else {
        msg = value.toString();
        id = value.toString();
      }
    }
    return {
      id: id,
      defaultMessage: msg
    };
  };
};

/**
 * toCase.sentence() lower cases strings before turning to sentence case.
 * toSentenceCase() uses the same logic, but without lowercasing first.
 */
function toSentenceCase(s) {
  var sentenceRegExp = toCase._.re.sentence;
  return s.replace(sentenceRegExp, function (m, prelude, letter) {
    return prelude + letter.toUpperCase();
  });
}

module.exports = {
  createMessage: createMessage
};