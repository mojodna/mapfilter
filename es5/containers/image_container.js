'use strict';

var _require = require('react-redux'),
    connect = _require.connect;

var ImageGrid = require('../components/image_grid');
var getImages = require('../selectors/images');

function mapStateToProps(state, ownProps) {
  return {
    images: getImages(state)
  };
}

module.exports = connect(mapStateToProps)(ImageGrid);