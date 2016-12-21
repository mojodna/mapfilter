'use strict';

var React = require('react');
var assign = require('object-assign');

var styles = {
  svg: {
    width: 24,
    height: 24,
    margin: 8
  },
  outline: {
    stroke: '#ffffff',
    strokeWidth: 4.9,
    strokeMiterlimit: 4,
    strokeOpacity: 0.75,
    fill: 'none'
  },
  text: {
    fill: '#fff'
  }
};

var MarkerIcon = function MarkerIcon(_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      _ref$color = _ref.color,
      color = _ref$color === undefined ? '#000000' : _ref$color,
      label = _ref.label;

  return React.createElement(
    'svg',
    {
      version: '1.1',
      style: assign({}, styles.svg, style),
      viewBox: '0 0 17 23' },
    React.createElement('path', {
      style: styles.outline,
      d: 'm 14.553146,8.5640275 c 0,3.5432455 -4.272809,9.2124385 -6.0531456,10.9840595 C 6.7196625,17.776466 2.4468536,12.107273 2.4468536,8.5640275 c 0,-2.8345967 2.8485396,-6.0235176 6.0531468,-6.0235176 3.2046076,0 6.0531456,3.1889209 6.0531456,6.0235176 z'
    }),
    React.createElement('path', {
      style: { fill: color },
      d: 'm 14.553146,8.5640275 c 0,3.5432455 -4.272809,9.2124385 -6.0531456,10.9840595 C 6.7196625,17.776466 2.4468536,12.107273 2.4468536,8.5640275 c 0,-2.8345967 2.8485396,-6.0235176 6.0531468,-6.0235176 3.2046076,0 6.0531456,3.1889209 6.0531456,6.0235176 z'
    }),
    label && React.createElement(
      'text',
      { x: '8.5', y: '12.5', fontSize: '9', fontFamily: 'Roboto', textAnchor: 'middle', style: styles.text },
      label
    )
  );
};

module.exports = MarkerIcon;