'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');

var _require = require('react-motion'),
    TransitionMotion = _require.TransitionMotion,
    spring = _require.spring;

var Match = require('react-router/Match').default;
var Link = require('react-router/Link').default;
var assign = require('object-assign');
var omit = require('lodash/omit');

var springParameters = {
  overlay: {
    stiffness: 800,
    damping: 50
  },
  content: {
    stiffness: 800,
    damping: 35
  },
  leave: {
    stiffness: 500,
    damping: 40
  }
};

var willLeave = function willLeave() {
  return {
    overlayOpacity: spring(0, springParameters.leave),
    size: spring(0.5, springParameters.leave),
    opacity: spring(0, springParameters.leave)
  };
};

var willEnter = function willEnter() {
  return {
    overlayOpacity: 0,
    size: 0.5,
    opacity: 0
  };
};

var styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none'
  },
  overlayLink: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    cursor: 'default',
    pointerEvents: 'auto',
    left: 0
  },
  content: {
    position: 'static',
    flex: 1,
    border: 'none',
    background: 'none',
    overflow: 'visible',
    WebkitOverflowScrolling: 'touch',
    borderRadius: 0,
    outline: 'none',
    margin: 0,
    padding: 0,
    height: 'calc(100% - 80px)',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 640,
    pointerEvents: 'auto'
  }
};

var getOverlayLinkStyle = function getOverlayLinkStyle(style) {
  return assign({}, styles.overlayLink, {
    backgroundColor: 'rgba(255, 255, 255, ' + style.overlayOpacity + ')'
  });
};

var getContentStyle = function getContentStyle(style) {
  return assign({}, styles.content, {
    transform: 'scale(' + style.size + ')',
    opacity: style.opacity
  });
};

var MatchModal = function MatchModal(props) {
  var render = props.render,
      Component = props.component;

  var rest = omit(props, ['render', 'component']);
  return React.createElement(Match, (0, _extends3.default)({}, rest, { children: function children(props) {
      var matched = props.matched,
          location = props.location,
          params = props.params;

      var closeLocation = matched && assign({}, location, {
        pathname: '/' + params.section
      });
      return React.createElement(
        TransitionMotion,
        {
          willLeave: willLeave,
          willEnter: willEnter,
          styles: matched ? [{
            key: location.pathname,
            style: {
              overlayOpacity: spring(0.8, springParameters.overlay),
              size: spring(1, springParameters.content),
              opacity: spring(1, springParameters.content)
            },
            data: props
          }] : []
        },
        function (interpolatedStyles) {
          return React.createElement(
            'div',
            null,
            interpolatedStyles.map(function (config) {
              return React.createElement(
                'div',
                {
                  key: config.key,
                  style: styles.overlay
                },
                matched && React.createElement(Link, { to: closeLocation, style: getOverlayLinkStyle(config.style) }),
                React.createElement(
                  'div',
                  { style: getContentStyle(config.style) },
                  render ? render(config.data) : React.createElement(Component, config.data)
                )
              );
            })
          );
        }
      );
    } }));
};

module.exports = MatchModal;