'use strict';

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

var _require = require('react-redux'),
    connect = _require.connect;

var assign = require('object-assign');
var debug = require('debug')('mf:mapview');
var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;

var mapboxgl = require('mapbox-gl');
var deepEqual = require('deep-equal');

var MFPropTypes = require('../util/prop_types');

var _require2 = require('../util/map_helpers'),
    getBoundsOrWorld = _require2.getBoundsOrWorld;

var config = require('../../config.json');
var Popup = require('./popup');

require('insert-css')('.mapboxgl-map{font:12px/20px \'Helvetica Neue\', Arial, Helvetica, sans-serif;overflow:hidden;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0);}.mapboxgl-canvas-container.mapboxgl-interactive,.mapboxgl-ctrl-nav-compass{cursor:-webkit-grab;cursor:-moz-grab;cursor:grab;}.mapboxgl-canvas-container.mapboxgl-interactive:active,.mapboxgl-ctrl-nav-compass:active{cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing;}.mapboxgl-ctrl-top-left,.mapboxgl-ctrl-top-right,.mapboxgl-ctrl-bottom-left,.mapboxgl-ctrl-bottom-right{position:absolute;pointer-events:none;z-index:2;}.mapboxgl-ctrl-top-left{top:0;left:0;}.mapboxgl-ctrl-top-right{top:0;right:0;}.mapboxgl-ctrl-bottom-left{bottom:0;left:0;}.mapboxgl-ctrl-bottom-right{right:0;bottom:0;}.mapboxgl-ctrl{clear:both;pointer-events:auto;}.mapboxgl-ctrl-top-left .mapboxgl-ctrl{margin:10px 0 0 10px;float:left;}.mapboxgl-ctrl-top-right .mapboxgl-ctrl{margin:10px 10px 0 0;float:right;}.mapboxgl-ctrl-bottom-left .mapboxgl-ctrl{margin:0 0 10px 10px;float:left;}.mapboxgl-ctrl-bottom-right .mapboxgl-ctrl{margin:0 10px 10px 0;float:right;}.mapboxgl-ctrl-group{border-radius:4px;-moz-box-shadow:0px 0px 2px rgba(0,0,0,0.1);-webkit-box-shadow:0px 0px 2px rgba(0,0,0,0.1);box-shadow:0px 0px 0px 2px rgba(0,0,0,0.1);overflow:hidden;background:#fff;}.mapboxgl-ctrl-group > button{width:30px;height:30px;display:block;padding:0;outline:none;border:none;border-bottom:1px solid #ddd;box-sizing:border-box;background-color:rgba(0,0,0,0);cursor:pointer;}.mapboxgl-ctrl > button::-moz-focus-inner{border:0;padding:0;}.mapboxgl-ctrl > button:last-child{border-bottom:0;}.mapboxgl-ctrl > button:hover{background-color:rgba(0,0,0,0.05);}.mapboxgl-ctrl-icon,.mapboxgl-ctrl-icon > span.arrow{speak:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}.mapboxgl-ctrl-icon.mapboxgl-ctrl-zoom-out{padding:5px;background-image:url("data:image/svg+xml;charset=utf8,%3Csvg%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%0A%20%20%3Cpath%20style%3D%27fill%3A%23333333%3B%27%20d%3D%27m%207%2C9%20c%20-0.554%2C0%20-1%2C0.446%20-1%2C1%200%2C0.554%200.446%2C1%201%2C1%20l%206%2C0%20c%200.554%2C0%201%2C-0.446%201%2C-1%200%2C-0.554%20-0.446%2C-1%20-1%2C-1%20z%27%20%2F%3E%0A%3C%2Fsvg%3E%0A");}.mapboxgl-ctrl-icon.mapboxgl-ctrl-zoom-in{padding:5px;background-image:url("data:image/svg+xml;charset=utf8,%3Csvg%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%0A%20%20%3Cpath%20style%3D%27fill%3A%23333333%3B%27%20d%3D%27M%2010%206%20C%209.446%206%209%206.4459904%209%207%20L%209%209%20L%207%209%20C%206.446%209%206%209.446%206%2010%20C%206%2010.554%206.446%2011%207%2011%20L%209%2011%20L%209%2013%20C%209%2013.55401%209.446%2014%2010%2014%20C%2010.554%2014%2011%2013.55401%2011%2013%20L%2011%2011%20L%2013%2011%20C%2013.554%2011%2014%2010.554%2014%2010%20C%2014%209.446%2013.554%209%2013%209%20L%2011%209%20L%2011%207%20C%2011%206.4459904%2010.554%206%2010%206%20z%27%20%2F%3E%0A%3C%2Fsvg%3E%0A");}.mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate{padding:5px;background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgdmVyc2lvbj0iMS4xIj48cGF0aCBkPSJNMTAgNEM5IDQgOSA1IDkgNUw5IDUuMUE1IDUgMCAwIDAgNS4xIDlMNSA5QzUgOSA0IDkgNCAxMCA0IDExIDUgMTEgNSAxMUw1LjEgMTFBNSA1IDAgMCAwIDkgMTQuOUw5IDE1QzkgMTUgOSAxNiAxMCAxNiAxMSAxNiAxMSAxNSAxMSAxNUwxMSAxNC45QTUgNSAwIDAgMCAxNC45IDExTDE1IDExQzE1IDExIDE2IDExIDE2IDEwIDE2IDkgMTUgOSAxNSA5TDE0LjkgOUE1IDUgMCAwIDAgMTEgNS4xTDExIDVDMTEgNSAxMSA0IDEwIDR6TTEwIDYuNUEzLjUgMy41IDAgMCAxIDEzLjUgMTAgMy41IDMuNSAwIDAgMSAxMCAxMy41IDMuNSAzLjUgMCAwIDEgNi41IDEwIDMuNSAzLjUgMCAwIDEgMTAgNi41ek0xMCA4LjNBMS44IDEuOCAwIDAgMCA4LjMgMTAgMS44IDEuOCAwIDAgMCAxMCAxMS44IDEuOCAxLjggMCAwIDAgMTEuOCAxMCAxLjggMS44IDAgMCAwIDEwIDguM3oiIGZpbGw9IiMzMzMiLz48L3N2Zz4=");}.mapboxgl-ctrl-icon.mapboxgl-ctrl-compass > span.arrow{width:20px;height:20px;margin:5px;background-image:url("data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2020%2020%27%3E%0A%09%3Cpolygon%20fill%3D%27%23333333%27%20points%3D%276%2C9%2010%2C1%2014%2C9%27%2F%3E%0A%09%3Cpolygon%20fill%3D%27%23CCCCCC%27%20points%3D%276%2C11%2010%2C19%2014%2C11%20%27%2F%3E%0A%3C%2Fsvg%3E");background-repeat:no-repeat;display:inline-block;}.mapboxgl-ctrl.mapboxgl-ctrl-attrib{padding:0 5px;background-color:rgba(255,255,255,0.5);margin:0;}.mapboxgl-ctrl-attrib a{color:rgba(0,0,0,0.75);text-decoration:none;}.mapboxgl-ctrl-attrib a:hover{color:inherit;text-decoration:underline;}.mapboxgl-ctrl-attrib .mapbox-improve-map{font-weight:bold;margin-left:2px;}.mapboxgl-ctrl-scale{background-color:rgba(255,255,255,0.75);font-size:10px;border-width:medium 2px 2px;border-style:none solid solid;border-color:#333;padding:0 5px;color:#333;}.mapboxgl-popup{position:absolute;top:0;left:0;display:-webkit-flex;display:flex;will-change:transform;pointer-events:none;}.mapboxgl-popup-anchor-top,.mapboxgl-popup-anchor-top-left,.mapboxgl-popup-anchor-top-right{-webkit-flex-direction:column;flex-direction:column;}.mapboxgl-popup-anchor-bottom,.mapboxgl-popup-anchor-bottom-left,.mapboxgl-popup-anchor-bottom-right{-webkit-flex-direction:column-reverse;flex-direction:column-reverse;}.mapboxgl-popup-anchor-left{-webkit-flex-direction:row;flex-direction:row;}.mapboxgl-popup-anchor-right{-webkit-flex-direction:row-reverse;flex-direction:row-reverse;}.mapboxgl-popup-tip{width:0;height:0;border:10px solid transparent;z-index:1;}.mapboxgl-popup-anchor-top .mapboxgl-popup-tip{-webkit-align-self:center;align-self:center;border-top:none;border-bottom-color:#fff;}.mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip{-webkit-align-self:flex-start;align-self:flex-start;border-top:none;border-left:none;border-bottom-color:#fff;}.mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip{-webkit-align-self:flex-end;align-self:flex-end;border-top:none;border-right:none;border-bottom-color:#fff;}.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip{-webkit-align-self:center;align-self:center;border-bottom:none;border-top-color:#fff;}.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip{-webkit-align-self:flex-start;align-self:flex-start;border-bottom:none;border-left:none;border-top-color:#fff;}.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip{-webkit-align-self:flex-end;align-self:flex-end;border-bottom:none;border-right:none;border-top-color:#fff;}.mapboxgl-popup-anchor-left .mapboxgl-popup-tip{-webkit-align-self:center;align-self:center;border-left:none;border-right-color:#fff;}.mapboxgl-popup-anchor-right .mapboxgl-popup-tip{-webkit-align-self:center;align-self:center;border-right:none;border-left-color:#fff;}.mapboxgl-popup-close-button{position:absolute;right:0;top:0;border:none;border-radius:0 3px 0 0;cursor:pointer;background-color:rgba(0,0,0,0);}.mapboxgl-popup-close-button:hover{background-color:rgba(0,0,0,0.05);}.mapboxgl-popup-content{position:relative;background:#fff;border-radius:3px;box-shadow:0 1px 2px rgba(0,0,0,0.10);padding:10px 10px 15px;pointer-events:auto;}.mapboxgl-popup-anchor-top-left .mapboxgl-popup-content{border-top-left-radius:0;}.mapboxgl-popup-anchor-top-right .mapboxgl-popup-content{border-top-right-radius:0;}.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-content{border-bottom-left-radius:0;}.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-content{border-bottom-right-radius:0;}.mapboxgl-marker{position:absolute;top:0;left:0;will-change:transform;}.mapboxgl-crosshair,.mapboxgl-crosshair .mapboxgl-interactive,.mapboxgl-crosshair .mapboxgl-interactive:active{cursor:crosshair;}.mapboxgl-boxzoom{position:absolute;top:0;left:0;width:0;height:0;background:#fff;border:2px dotted #202020;opacity:0.5;}@media print{.mapbox-improve-map{display:none;}}');
require('insert-css')('.mapboxgl-popup-tip{border:0;}.mapboxgl-popup{top:-12px;}.mapboxgl-popup-content{padding:0;background-color:black;cursor:pointer;pointer-events:none;}.mapboxgl-popup-content img{width:200px;height:200px;object-fit:cover;display:block;}.mapboxgl-popup-content .__mf_popup_title{background-color:black;width:200px;color:white;}.mapboxgl-popup-content .__mf_popup_title.__mf_popup_img{background-color:rgba(0,0,0,0.5);position:absolute;bottom:0;width:100%;}.mapboxgl-popup-content .__mf_popup_title h1,.mapboxgl-popup-content .__mf_popup_title h2{margin:5px 10px;}.mapboxgl-popup-content .__mf_popup_title h2{font-style:normal;font-size:14px;}');

/* Mapbox [API access token](https://www.mapbox.com/help/create-api-access-token/) */
mapboxgl.accessToken = config.mapboxToken;

var emptyFeatureCollection = {
  type: 'FeatureCollection',
  features: []
};

var savedMap = void 0;
var savedMapDiv = void 0;

var pointStyleLayer = {
  id: 'features',
  type: 'symbol',
  source: 'features',
  layout: {
    'icon-image': 'marker-{__mf_color}',
    'icon-allow-overlap': true,
    'icon-ignore-placement': true,
    'icon-offset': [0, -10]
  }
};

var pointHoverStyleLayer = {
  id: 'features-hover',
  type: 'symbol',
  source: 'features',
  filter: ['==', '__mf_id', ''],
  layout: {
    'icon-image': 'marker-{__mf_color}-hover',
    'icon-allow-overlap': true,
    'icon-ignore-placement': true,
    'icon-offset': [0, -10]
  }
};

var pointLabelsStyle = {
  layout: {
    'text-field': '{__mf_label}',
    'text-allow-overlap': true,
    'text-ignore-placement': true,
    'text-size': 10,
    'text-font': ['Open Sans Bold']
  },
  paint: {
    'text-color': '#fff',
    'text-translate': [0, -11],
    'text-halo-color': '#333',
    'text-halo-width': 1
  }
};

var noop = function noop(x) {
  return x;
};

var MapView = function (_React$Component) {
  (0, _inherits3.default)(MapView, _React$Component);

  function MapView() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MapView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MapView.__proto__ || (0, _getPrototypeOf2.default)(MapView)).call.apply(_ref, [this].concat(args))), _this), _this.handleMapMoveOrZoom = function (e) {
      _this.props.onMove({
        center: _this.map.getCenter().toArray(),
        zoom: _this.map.getZoom(),
        bearing: _this.map.getBearing()
      });
    }, _this.handleMapClick = function (e) {
      if (!_this.map.loaded()) return;
      var features = _this.map.queryRenderedFeatures(e.point, { layers: ['features', 'features-hover'] });
      if (!features.length) return;
      _this.props.onMarkerClick(features[0].properties.__mf_id);
    }, _this.handleMouseMove = function (e) {
      if (!_this.map.loaded()) return;
      var features = _this.map.queryRenderedFeatures(e.point, { layers: ['features', 'features-hover'] });
      _this.map.getCanvas().style.cursor = features.length ? 'pointer' : '';
      if (!features.length) {
        _this.popup.remove();
        _this.map.setFilter('features-hover', ['==', '__mf_id', '']);
        return;
      }
      var props = features[0].properties;
      var hoveredFeatureId = props.__mf_id;
      _this.map.setFilter('features-hover', ['==', '__mf_id', hoveredFeatureId]);
      // Popuplate the popup and set its coordinates
      // based on the feature found.
      if (!_this.popup._map || hoveredFeatureId && hoveredFeatureId !== _this.popup.__featureId) {
        _this.popup.setLngLat(features[0].geometry.coordinates).addTo(_this.map).__featureId = hoveredFeatureId;
        _this.renderPopup(props);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MapView, [{
    key: 'renderPopup',
    value: function renderPopup(featureProps) {
      var fieldMapping = this.props.fieldMapping;
      var popupProps = (0, _keys2.default)(fieldMapping).reduce(function (prev, field) {
        prev[field] = featureProps[fieldMapping[field]];
        return prev;
      }, {});
      var media = popupProps.media,
          title = popupProps.title,
          subtitle = popupProps.subtitle;

      this.popup._createContent();
      this.popup._update();
      ReactDOM.render(React.createElement(Popup, { imgSrc: media, title: title, subtitle: subtitle }), this.popup._content);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var style = this.props.style;


      return React.createElement('div', {
        ref: function ref(el) {
          return _this2.mapContainer = el;
        },
        style: style
      });
    }
  }, {
    key: 'centerMap',
    value: function centerMap(geojson) {
      var bounds = getBoundsOrWorld(geojson);

      // workaround for https://github.com/mapbox/mapbox-gl-js/issues/3307
      // (more than 1 point with the same coordinates)
      if (bounds[0] === bounds[2] && bounds[1] === bounds[3]) {
        this.map.setCenter(bounds.slice(0, 2));
      } else {
        this.map.fitBounds(getBoundsOrWorld(geojson), { padding: 15 });
      }
    }

    // The first time our component mounts, render a new map into `mapDiv`
    // with settings from props.

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      var _props = this.props,
          center = _props.center,
          disableScrollToZoom = _props.disableScrollToZoom,
          filter = _props.filter,
          labelPoints = _props.labelPoints,
          mapStyle = _props.mapStyle,
          geojson = _props.geojson,
          zoom = _props.zoom;

      var map = void 0;

      if (savedMap) {
        this.mapContainer.appendChild(savedMapDiv);
        map = this.map = savedMap;
        map.resize();
        this.componentWillReceiveProps(this.props);
        return;
      }
      var mapDiv = savedMapDiv = document.createElement('div');
      mapDiv.style.height = '100%';
      mapDiv.style.width = '100%';
      this.mapContainer.appendChild(mapDiv);

      map = this.map = savedMap = new mapboxgl.Map({
        style: mapStyle,
        container: mapDiv,
        center: center || [0, 0],
        zoom: zoom || 0
      });

      if (disableScrollToZoom) {
        map.scrollZoom.disable();
      }

      // Add zoom and rotation controls to the map.
      map.addControl(new mapboxgl.NavigationControl());
      map.dragRotate.disable();
      map.touchZoomRotate.disableRotation();

      this.popup = new mapboxgl.Popup({
        closeButton: false,
        anchor: 'bottom-left'
      });

      map.on('load', function () {
        map.on('moveend', _this3.handleMapMoveOrZoom);
        map.on('click', _this3.handleMapClick);
        map.on('mousemove', _this3.handleMouseMove);
        map.addSource('features', { type: 'geojson', data: geojson });
        // TODO: Should choose style based on whether features are point, line or polygon

        var pointStyle = pointStyleLayer;
        var pointHoverStyle = pointHoverStyleLayer;

        if (labelPoints) {
          pointStyle = assign({}, pointStyle, {
            layout: assign({}, pointStyle.layout, pointLabelsStyle.layout),
            paint: assign({}, pointStyle.paint, pointLabelsStyle.paint)
          });

          pointHoverStyle = assign({}, pointHoverStyle, {
            layout: assign({}, pointHoverStyle.layout, pointLabelsStyle.layout),
            paint: assign({}, pointHoverStyle.paint, pointLabelsStyle.paint)
          });
        }

        map.addLayer(pointStyle);
        map.addLayer(pointHoverStyle);
        if (filter) {
          map.setFilter('features', filter);
        }
      });

      // If no map center or zoom passed, set map extent to extent of marker layer
      if (!center || !zoom) {
        this.centerMap(geojson);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.moveIfNeeded(nextProps.center, nextProps.zoom);
      var isDataUpdated = this.updateDataIfNeeded(nextProps.geojson, nextProps.coloredField);
      if (isDataUpdated && !nextProps.center || !nextProps.zoom) {
        this.centerMap(nextProps.geojson);
      }
      this.updateFilterIfNeeded(nextProps.filter);

      if (this.props.mapStyle !== nextProps.mapStyle) {
        this.map.setStyle(nextProps.mapStyle);
      }

      if (nextProps.disableScrollToZoom) {
        console.log('disabling scroll to zoom');
        this.map.scrollZoom.disable();
      } else {
        console.log('enabling scroll to zoom');
        this.map.scrollZoom.enable();
      }

      // TODO should re-style points + point hovers according to labelPoints
    }

    // We always return false from this function because we don't want React to
    // handle any rendering of the map itself, we do all that via mapboxgl

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return false;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
    // this.map.remove()


    /**
     * Moves the map to a new position if it is different from the current position
     * @param {array} center new coordinates for center of map
     * @param {number} zoom   new zoom level for map
     * @return {boolean} true if map has moved, otherwise false
     */

  }, {
    key: 'moveIfNeeded',
    value: function moveIfNeeded(center, zoom) {
      var currentPosition = {
        center: this.map.getCenter().toArray(),
        zoom: this.map.getZoom()
      };
      var newMapPosition = {
        center: center,
        zoom: zoom
      };
      var shouldMapMove = center && zoom && !deepEqual(currentPosition, newMapPosition);
      if (shouldMapMove) {
        debug('Moving map');
        this.map.jumpTo(newMapPosition);
        return true;
      }
      return false;
    }

    /**
     * [updateDataIfNeeded description]
     * @param {[type]} features     [description]
     * @param {[type]} coloredField [description]
     * @return {[type]} [description]
     */

  }, {
    key: 'updateDataIfNeeded',
    value: function updateDataIfNeeded(geojson, coloredField) {
      var _this4 = this;

      if (geojson === this.geojson && (!coloredField || coloredField === this.coloredField)) {
        return;
      }
      this.geojson = geojson;
      this.coloredField = coloredField;
      debug('updated map geojson');
      if (this.map.loaded()) {
        this.map.getSource('features').setData(geojson);
      } else {
        this.map.on('load', function () {
          return _this4.map.getSource('features').setData(geojson);
        });
      }
    }
  }, {
    key: 'updateFilterIfNeeded',
    value: function updateFilterIfNeeded(filter) {
      var _this5 = this;

      if (filter !== this.filter && filter) {
        this.filter = filter;
        debug('new filter');
        if (this.map.style.loaded()) {
          this.map.setFilter('features', filter);
        } else {
          this.map.on('load', function () {
            return _this5.map.setFilter('features', filter);
          });
        }
      }
    }
  }]);
  return MapView;
}(React.Component);

MapView.defaultProps = {
  geojson: emptyFeatureCollection,
  onMarkerClick: noop,
  onMove: noop,
  style: {
    height: '100%',
    width: '100%'
  },
  disableScrollToZoom: false,
  labelPoints: false
};
MapView.propTypes = {
  /* map center point [lon, lat] */
  center: PropTypes.array,
  /* Geojson FeatureCollection of features to show on map */
  geojson: PropTypes.shape({
    type: PropTypes.oneOf(['FeatureCollection']).isRequired,
    features: PropTypes.arrayOf(MFPropTypes.mapViewFeature).isRequired
  }),
  /* Current filter (See https://www.mapbox.com/mapbox-gl-style-spec/#types-filter) */
  filter: MFPropTypes.mapboxFilter,
  /**
   * - NOT yet dynamic e.g. if you change it the map won't change
   * Map style. This must be an an object conforming to the schema described in the [style reference](https://mapbox.com/mapbox-gl-style-spec/), or a URL to a JSON style. To load a style from the Mapbox API, you can use a URL of the form `mapbox://styles/:owner/:style`, where `:owner` is your Mapbox account name and `:style` is the style ID. Or you can use one of the predefined Mapbox styles.
   */
  mapStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  labelPoints: PropTypes.bool,
  /**
   * Triggered when a marker is clicked. Called with a (cloned) GeoJson feature
   * object of the marker that was clicked.
   */
  onMarkerClick: PropTypes.func,
  /* Triggered when map is moved, called with map center [lng, lat] */
  onMove: PropTypes.func,
  fieldMapping: MFPropTypes.fieldMapping,
  /* map zoom */
  zoom: PropTypes.number,
  /* container styling */
  style: PropTypes.object,
  disableScrollToZoom: PropTypes.bool
};


var mapStateToProps = function mapStateToProps(state) {
  return {
    mapStyle: state.mapStyle
  };
};

module.exports = connect(mapStateToProps)(MapView);