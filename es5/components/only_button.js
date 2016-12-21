'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var FlatButton = require('material-ui/FlatButton').default;

var _require = require('react-intl'),
    defineMessages = _require.defineMessages,
    FormattedMessage = _require.FormattedMessage;

var styles = {
  flatButton: {
    height: 30,
    lineHeight: '29px',
    position: 'absolute',
    right: 0,
    top: -4,
    zIndex: 3,
    backgroundColor: 'rgba(235, 235, 235, 0.9)'
  },
  flatButtonLabel: {
    fontSize: 12,
    top: 0
  }
};

var messages = defineMessages({
  only: {
    id: 'filter.show_only',
    defaultMessage: 'Only',
    description: 'Button text to only show a particular field value in a filter'
  }
});

var OnlyButton = function OnlyButton(props) {
  return React.createElement(FlatButton, (0, _extends3.default)({
    labelStyle: styles.flatButtonLabel,
    label: React.createElement(FormattedMessage, messages.only),
    primary: true,
    style: styles.flatButton
  }, props));
};

module.exports = OnlyButton;