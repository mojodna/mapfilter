'use strict';

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

var routerContextType = require('react-router/PropTypes').routerContext;
var MapView = require('../components/map_view');

var _require2 = require('../action_creators'),
    moveMap = _require2.moveMap;

var getMapGeoJSON = require('../selectors/map_geojson');
var getMapBoxFilter = require('../selectors/mapbox_filter');
var getFieldMapping = require('../selectors/field_mapping');

var assign = require('object-assign');
var deepEqual = require('deep-equal');
var roundTo = require('round-to');

var MapContainer = function (_React$Component) {
  (0, _inherits3.default)(MapContainer, _React$Component);

  function MapContainer() {
    (0, _classCallCheck3.default)(this, MapContainer);
    return (0, _possibleConstructorReturn3.default)(this, (MapContainer.__proto__ || (0, _getPrototypeOf2.default)(MapContainer)).apply(this, arguments));
  }

  (0, _createClass3.default)(MapContainer, [{
    key: 'componentWillMount',


    // Read the map position from the URL on first load
    value: function componentWillMount() {
      var _props = this.props,
          center = _props.center,
          zoom = _props.zoom,
          query = _props.location.query,
          onMove = _props.onMove;

      query = query || {};
      // If `center` and `zoom` are not set, try to read from the URL query
      // parameter and update the application state.
      var isUrlValid = !isNaN(+query.lng) && !isNaN(+query.lat) && !isNaN(+query.z);
      if ((!center || !zoom) && isUrlValid) {
        onMove({
          zoom: +query.z,
          center: [+query.lng, +query.lat]
        });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props2 = this.props,
          center = _props2.center,
          zoom = _props2.zoom,
          location = _props2.location;
      var router = this.context.router;

      if (deepEqual(center, nextProps.center) && zoom === nextProps.zoom) return;
      // If `mapPosition` has changed, update URL query string to new value
      var newQuery = assign({}, nextProps.location.query, {
        z: nextProps.zoom && roundTo(nextProps.zoom, 2),
        lng: nextProps.center && roundTo(nextProps.center[0], 4),
        lat: nextProps.center && roundTo(nextProps.center[1], 4)
      });
      var newLocation = assign({}, location, {
        search: null,
        query: newQuery
      });
      router.transitionTo(newLocation);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(MapView, this.props);
    }
  }]);
  return MapContainer;
}(React.Component);

MapContainer.contextTypes = {
  router: routerContextType.isRequired
};


function mapStateToProps(state) {
  return {
    center: state.mapPosition.center,
    zoom: state.mapPosition.zoom,
    geojson: getMapGeoJSON(state),
    filter: getMapBoxFilter(state),
    fieldMapping: getFieldMapping(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMove: function onMove(mapPosition) {
      return dispatch(moveMap(mapPosition));
    }
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(MapContainer);