'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var PropTypes = React.PropTypes;


var FeatureModal = require('../components/feature_modal');
var MFPropTypes = require('../util/prop_types');
var MapView = require('../components/map_view');
var getFieldMapping = require('../selectors/field_mapping');
var getFilteredFeatures = require('../selectors/filtered_features');
var getMapboxFilter = require('../selectors/mapbox_filter');
var getMapGeoJSON = require('../selectors/map_geojson');

var styles = {
  report: {
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    overflow: 'scroll'
  },
  mapView: {
    height: '500px',
    width: '100%'
  }
};

var ReportContainer = function (_React$Component) {
  (0, _inherits3.default)(ReportContainer, _React$Component);

  function ReportContainer() {
    (0, _classCallCheck3.default)(this, ReportContainer);
    return (0, _possibleConstructorReturn3.default)(this, (ReportContainer.__proto__ || (0, _getPrototypeOf2.default)(ReportContainer)).apply(this, arguments));
  }

  (0, _createClass3.default)(ReportContainer, [{
    key: 'render',
    value: function render() {
      var features = this.props.features;


      return React.createElement(
        'div',
        { className: 'report container', style: styles.report },
        React.createElement(
          'h2',
          null,
          features.length,
          ' Observations'
        ),
        React.createElement(MapView, (0, _extends3.default)({}, this.props, {
          style: styles.mapView,
          disableScrollToZoom: true,
          labelPoints: true
        })),
        features.map(function (feature, id) {
          return React.createElement(FeatureModal, {
            key: id,
            id: feature.id,
            label: feature.properties.__mf_label,
            restrictHeight: false
          });
        })
      );
    }
  }]);
  return ReportContainer;
}(React.Component);

ReportContainer.propTypes = {
  features: PropTypes.array.isRequired,
  fieldMapping: MFPropTypes.fieldMapping,
  filter: MFPropTypes.mapboxFilter,
  geojson: PropTypes.shape({
    type: PropTypes.oneOf(['FeatureCollection']).isRequired,
    features: PropTypes.arrayOf(MFPropTypes.mapViewFeature).isRequired
  }).isRequired
};


function mapStateToProps(state) {
  return {
    features: getFilteredFeatures(state),
    fieldMapping: getFieldMapping(state),
    filter: getMapboxFilter(state),
    geojson: getMapGeoJSON(state)
  };
}

module.exports = connect(mapStateToProps)(ReportContainer);