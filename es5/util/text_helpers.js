'use strict';

function sentenceCase() {
  var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  // Matches the first letter in the string and the first letter that follows a
  // period (and 1 or more spaces) and transforms that letter to uppercase.
  return s.replace(/(^[a-z])|(\.\s*[a-z])/g, function (s) {
    return s.toUpperCase();
  });
}

function titleCase(str) {
  return str.toLowerCase().split(' ').map(function (word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}

function t() {
  var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return sentenceCase(s.replace(/_/g, ' '));
}

module.exports = {
  sentenceCase: sentenceCase,
  titleCase: titleCase,
  t: t
};