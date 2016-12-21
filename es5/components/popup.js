'use strict';

var React = require('react');
var Image = require('./image');

var styles = {
  image: {
    width: 200,
    height: 200,
    display: 'block',
    background: '#000000'
  }
};

var Popup = function Popup(_ref) {
  var imgSrc = _ref.imgSrc,
      title = _ref.title,
      subtitle = _ref.subtitle;
  return React.createElement(
    'div',
    null,
    imgSrc && React.createElement(Image, { src: imgSrc, style: styles.image }),
    React.createElement(
      'div',
      { className: '__mf_popup_title' + (imgSrc ? ' __mf_popup_img' : '') },
      React.createElement(
        'h1',
        null,
        title
      ),
      React.createElement(
        'h2',
        null,
        subtitle
      )
    )
  );
};

module.exports = Popup;