'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

// Needed by material-ui for onTouchTap to work
require('react-tap-event-plugin')();

var rootEl = document.getElementById('root');

var render = function render() {
  var App = require('./containers/app');
  ReactDOM.render(React.createElement(App, null), rootEl);
};

if (module.hot) {
  (function () {
    // Support hot reloading of components
    // and display an overlay for runtime errors
    var renderApp = render;
    var renderError = function renderError(error) {
      var RedBox = require('redbox-react');
      ReactDOM.render(React.createElement(RedBox, { error: error }), rootEl);
    };
    render = function render() {
      try {
        renderApp();
      } catch (error) {
        renderError(error);
      }
    };
    module.hot.accept('./containers/app', function () {
      setTimeout(render);
    });
  })();
}

render();