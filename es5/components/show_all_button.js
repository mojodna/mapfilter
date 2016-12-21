'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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
    top: 9
  },
  flatButtonLabel: {
    fontSize: 12,
    top: 0
  }
};

var messages = defineMessages({
  showAll: {
    id: 'filter.show_all',
    defaultMessage: 'Show All',
    description: 'Button text to turn off filters for a field'
  }
});

var ShowAllButton = function ShowAllButton(props) {
  return React.createElement(FlatButton, (0, _extends3.default)({
    labelStyle: styles.flatButtonLabel,
    label: React.createElement(FormattedMessage, messages.showAll),
    primary: true
  }, props, {
    style: (0, _assign2.default)({}, props.style, styles.flatButton) }));
};

module.exports = ShowAllButton;