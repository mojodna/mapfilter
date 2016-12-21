'use strict';

var React = require('react');
var Link = require('react-router/Link').default;
var AppBar = require('material-ui/AppBar').default;

var _require = require('react-intl'),
    defineMessages = _require.defineMessages,
    FormattedMessage = _require.FormattedMessage;

var styles = {
  topBar: {
    height: 56
  },
  title: {
    height: 56,
    lineHeight: '56px'
  },
  tabs: {
    flex: 1,
    maxWidth: 300,
    display: 'flex'
  },
  tab: {
    display: 'flex',
    flex: 1,
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.701961)',
    textDecoration: 'none',
    textTransform: 'uppercase',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box'
  },
  activeTab: {
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: 500,
    borderBottom: '2px solid rgb(255, 64, 129)',
    paddingTop: 2
  },
  right: {
    flex: 1
  }
};

var messages = defineMessages({
  map: {
    id: 'topbar.map',
    defaultMessage: 'Map',
    description: 'Map tab name'
  },
  photos: {
    id: 'topbar.photos',
    defaultMessage: 'Photos',
    description: 'Photos tab name'
  },
  report: {
    id: 'topbar.report',
    defaultMessage: 'Report',
    description: 'Report tab name'
  }
});

function TopBar(_ref) {
  var currentSection = _ref.currentSection,
      tabs = _ref.tabs;

  return React.createElement(
    AppBar,
    {
      className: 'nav container',
      title: 'MapFilter',
      style: styles.topBar,
      titleStyle: styles.title,
      showMenuIconButton: false },
    React.createElement(
      'div',
      { style: styles.tabs },
      tabs.map(function (tab) {
        return React.createElement(
          Link,
          { key: tab.id, to: tab.link, style: styles.tab, activeStyle: styles.activeTab },
          React.createElement(FormattedMessage, messages[tab.id])
        );
      })
    ),
    React.createElement('div', { style: styles.right })
  );
}

module.exports = TopBar;