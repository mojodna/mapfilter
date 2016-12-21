'use strict';

var React = require('react');

var _require = require('material-ui/Card'),
    Card = _require.Card,
    CardMedia = _require.CardMedia,
    CardText = _require.CardText,
    CardHeader = _require.CardHeader;

var styles = {
  card: {
    width: '100%',
    height: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
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
    height: 0,
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

var Report = function Report(_ref) {
  var color = _ref.color,
      media = _ref.media,
      data = _ref.data,
      title = _ref.title,
      subtitle = _ref.subtitle,
      onCloseClick = _ref.onCloseClick;
  return React.createElement(
    Card,
    {
      style: styles.card,
      containerStyle: styles.cardContainerStyle,
      zDepth: 2 },
    React.createElement(
      CardHeader,
      {
        style: styles.header,
        avatar: React.createElement(MarkerIcon, { color: color, style: styles.markerIcon }),
        title: React.createElement(FormattedMessage, msg('field_value')(title)),
        subtitle: React.createElement(FormattedMessage, msg('field_value')(subtitle)) },
      React.createElement(
        IconButton,
        { style: { float: 'right' }, onTouchTap: onCloseClick },
        React.createElement(CloseIcon, null)
      )
    ),
    React.createElement(
      'div',
      { style: styles.scrollable },
      React.createElement(
        CardMedia,
        { style: styles.media },
        React.createElement(Image, { style: styles.img, src: media })
      ),
      React.createElement(
        CardText,
        null,
        React.createElement(FeatureTable, { data: data })
      )
    )
  );
};

module.exports = Report;