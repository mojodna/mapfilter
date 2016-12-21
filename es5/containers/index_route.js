'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');

var _require = require('react-redux'),
    connect = _require.connect;

var _require2 = require('redux'),
    bindActionCreators = _require2.bindActionCreators;

var Link = require('react-router/Link').default;
var Match = require('react-router/Match').default;
var Redirect = require('react-router/Redirect').default;
var Miss = require('react-router/Miss').default;
var assign = require('object-assign');
var FloatingActionButton = require('material-ui/FloatingActionButton').default;
var ContentAdd = require('material-ui/svg-icons/content/add').default;

var FilterContainer = require('./filter_container');
var TopBar = require('./top_bar');
var actionCreators = require('../action_creators');

var _require3 = require('../util/filter_helpers'),
    decodeFilter = _require3.decodeFilter,
    encodeFilter = _require3.encodeFilter;

var FilterConfigurator = require('../components/filter_configurator');
var MapContainer = require('./map_container');
var ReportContainer = require('./report_container');
var ImageContainer = require('./image_container');
var FeatureModal = require('../components/feature_modal');
var MatchModal = require('../components/match_modal');
var UploadFormDataModal = require('../components/upload_form_data_modal');

var styles = {
  outer: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Roboto, sans-serif',
    WebkitFontSmoothing: 'antialiased',
    fontSize: 15,
    lineHeight: '24px'
  },
  inner: {
    display: 'flex',
    flex: 1
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 2
  }
};

var IndexRoute = function (_React$Component) {
  (0, _inherits3.default)(IndexRoute, _React$Component);

  function IndexRoute() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, IndexRoute);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = IndexRoute.__proto__ || (0, _getPrototypeOf2.default)(IndexRoute)).call.apply(_ref, [this].concat(args))), _this), _this.closeModal = function () {
      var _this$props = _this.props,
          router = _this$props.router,
          location = _this$props.location;

      var newLocation = assign({}, location, {
        pathname: '/' + location.pathname.split('/')[1]
      });
      router.transitionTo(newLocation);
    }, _this.openFeatureModal = function (id) {
      var _this$props2 = _this.props,
          router = _this$props2.router,
          location = _this$props2.location;

      var newLocation = assign({}, location, {
        pathname: '/' + location.pathname.split('/')[1] + '/features/' + id
      });
      router.transitionTo(newLocation);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(IndexRoute, [{
    key: 'componentWillMount',


    // Read the filter and map position from the URL on first load
    value: function componentWillMount() {
      var _props = this.props,
          filters = _props.filters,
          query = _props.location.query,
          updateFilter = _props.updateFilter,
          router = _props.router;

      // If `filter` is not set, try to read it from the URL query parameter
      // and update the application state.

      if ((filters == null || (0, _keys2.default)(filters).length === 0) && query && query.filter) {
        try {
          updateFilter(decodeFilter(query.filter));
        } catch (e) {
          console.warn('Could not parse filter from URL, resetting filter');
          // Remove an invalid filter from the URL.
          var newQuery = assign({}, query, { filter: undefined });
          var newLocation = assign({}, this.props.location, newQuery);
          router.replaceWith(newLocation);
        }
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props2 = this.props,
          filters = _props2.filters,
          location = _props2.location,
          router = _props2.router;


      if (filters === nextProps.filters) {
        return;
      }

      // TODO: If the URL is more than 2000 characters (i.e. for large
      // filters) this will break IE < Edge.
      // http://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers
      router.transitionTo(assign({}, location, {
        search: null,
        query: assign({}, nextProps.location.query, {
          filter: encodeFilter(nextProps.filters)
        })
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var location = this.props.location;

      var sections = ['map', 'photos', 'report'];
      var tabs = sections.map(function (section) {
        return {
          active: section === location.pathname.split('/')[1],
          id: section,
          link: {
            pathname: '/' + section,
            query: location.query
          }
        };
      });

      return React.createElement(
        'div',
        { className: 'outer container', style: styles.outer },
        React.createElement(TopBar, { tabs: tabs }),
        React.createElement(
          'div',
          { className: 'inner container', style: styles.inner },
          React.createElement(FilterContainer, { location: location }),
          React.createElement(Match, { pattern: '/map', render: function render(matchProps) {
              return React.createElement(MapContainer, (0, _extends3.default)({}, matchProps, { onMarkerClick: _this2.openFeatureModal }));
            } }),
          React.createElement(Match, { pattern: '/photos', render: function render(matchProps) {
              return React.createElement(ImageContainer, (0, _extends3.default)({}, matchProps, { onImageClick: _this2.openFeatureModal }));
            } }),
          React.createElement(Match, { pattern: '/report', render: function render(matchProps) {
              return React.createElement(ReportContainer, (0, _extends3.default)({}, matchProps, { onMarkerClick: _this2.openFeatureModal }));
            } })
        ),
        React.createElement(MatchModal, {
          pattern: '/:section(map|photos|report)/features/:id',
          render: function render(matchProps) {
            return React.createElement(FeatureModal, {
              id: matchProps.params.id,
              onCloseClick: _this2.closeModal
            });
          } }),
        React.createElement(MatchModal, {
          pattern: '/:section(map|photos|report)/settings/filters',
          render: function render(matchProps) {
            return React.createElement(FilterConfigurator, {
              onCloseClick: _this2.closeModal
            });
          } }),
        React.createElement(MatchModal, {
          pattern: '/:section(map|photos|report)/add',
          render: function render(matchProps) {
            return React.createElement(UploadFormDataModal, {
              onCloseClick: _this2.closeModal
            });
          } }),
        React.createElement(Miss, { render: function render() {
            return React.createElement(Redirect, { to: '/map' });
          } }),
        React.createElement(
          Link,
          {
            to: {
              pathname: location.pathname + '/add',
              query: location.query
            } },
          React.createElement(
            FloatingActionButton,
            { style: styles.addButton },
            React.createElement(ContentAdd, null)
          )
        )
      );
    }
  }]);
  return IndexRoute;
}(React.Component);

module.exports = connect(function (state) {
  return {
    filters: state.filters
  };
}, function (dispatch) {
  return bindActionCreators(actionCreators, dispatch);
})(IndexRoute);