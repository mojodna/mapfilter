'use strict';

var React = require('react');

var _require = require('react-redux'),
    connect = _require.connect;

var _require2 = require('material-ui/Card'),
    Card = _require2.Card,
    CardMedia = _require2.CardMedia,
    CardText = _require2.CardText,
    CardHeader = _require2.CardHeader;

var IconButton = require('material-ui/IconButton').default;
var CloseIcon = require('material-ui/svg-icons/navigation/close').default;

var _require3 = require('react-intl'),
    FormattedMessage = _require3.FormattedMessage;

var getFeaturesById = require('../selectors/features_by_id');
var getFieldMapping = require('../selectors/field_mapping');
var getColorIndex = require('../selectors/color_index');
var getVisibleFields = require('../selectors/visible_fields');
var getFieldAnalysis = require('../selectors/field_analysis');

var _require4 = require('../util/intl_helpers'),
    msg = _require4.createMessage;

var MarkerIcon = require('./marker_icon');
var Image = require('./image');
var FeatureTable = require('./feature_table');

var styles = {
  card: {
    overflow: 'auto',
    maxHeight: '100%',
    width: '100%'
  },
  cardContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    display: 'flex'
  },
  header: {
    lineHeight: '22px',
    boxSizing: 'content-box',
    borderBottom: '1px solid #cccccc'
  },
  markerIcon: {
    width: 40,
    height: 40,
    margin: 0,
    marginRight: 16
  },
  scrollable: {
    flex: 1,
    overflow: 'auto'
  },
  media: {
    position: 'relative',
    height: '100%',
    padding: '67% 0 0 0'
  },
  img: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    objectFit: 'cover'
  }
};

var FeatureModal = function FeatureModal(_ref) {
  var color = _ref.color,
      label = _ref.label,
      media = _ref.media,
      data = _ref.data,
      title = _ref.title,
      subtitle = _ref.subtitle,
      onCloseClick = _ref.onCloseClick;
  return React.createElement(
    Card,
    {
      className: 'card',
      style: styles.card,
      containerStyle: styles.cardContainerStyle,
      zDepth: 2 },
    React.createElement(
      CardHeader,
      {
        style: styles.header,
        avatar: React.createElement(MarkerIcon, { color: color, style: styles.markerIcon, label: label }),
        title: React.createElement(FormattedMessage, msg('field_value')(title)),
        subtitle: React.createElement(FormattedMessage, msg('field_value')(subtitle)) },
      onCloseClick && React.createElement(
        IconButton,
        { style: { float: 'right' }, onTouchTap: onCloseClick },
        React.createElement(CloseIcon, null)
      )
    ),
    React.createElement(
      'div',
      { style: styles.scrollable },
      media && React.createElement(
        CardMedia,
        { style: styles.media },
        React.createElement(Image, { style: styles.img, src: media, progress: true })
      ),
      React.createElement(
        CardText,
        null,
        React.createElement(FeatureTable, { data: data })
      )
    )
  );
};

module.exports = connect(function (state, ownProps) {
  var featuresById = getFeaturesById(state);
  var colorIndex = getColorIndex(state);
  var fieldMapping = getFieldMapping(state);
  var visibleFields = getVisibleFields(state);
  var fieldAnalysis = getFieldAnalysis(state);

  var feature = featuresById[ownProps.id];
  if (!feature) return {};
  var geojsonProps = feature.properties;
  var data = visibleFields.filter(function (f) {
    return typeof geojsonProps[f] !== 'undefined';
  }).map(function (f) {
    return { key: f, value: geojsonProps[f], type: fieldAnalysis[f].type };
  });
  if (feature.geometry) {
    data.unshift({
      key: 'location',
      value: feature.geometry.coordinates
    });
  }
  return {
    data: data,
    media: geojsonProps[fieldMapping.media],
    title: geojsonProps[fieldMapping.title],
    subtitle: geojsonProps[fieldMapping.subtitle],
    color: colorIndex[geojsonProps[fieldMapping.color]]
  };
})(FeatureModal);