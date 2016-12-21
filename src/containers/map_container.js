const React = require('react')
const { connect } = require('react-redux')
const routerContextType = require('react-router/PropTypes').routerContext
const MapView = require('../components/map_view')
const { moveMap } = require('../action_creators')
const getMapGeoJSON = require('../selectors/map_geojson')
const getMapBoxFilter = require('../selectors/mapbox_filter')
const getFieldMapping = require('../selectors/field_mapping')

const assign = require('object-assign')
const deepEqual = require('deep-equal')
const roundTo = require('round-to')

class MapContainer extends React.Component {
  static contextTypes = {
    router: routerContextType.isRequired
  }

  // Read the map position from the URL on first load
  componentWillMount () {
    let {center, zoom, location: {query}, onMove} = this.props
    query = query || {}
    // If `center` and `zoom` are not set, try to read from the URL query
    // parameter and update the application state.
    const isUrlValid = !isNaN(+query.lng) && !isNaN(+query.lat) && !isNaN(+query.z)
    if ((!center || !zoom) && isUrlValid) {
      onMove({
        zoom: +query.z,
        center: [+query.lng, +query.lat]
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    const {center, zoom, location} = this.props
    const {router} = this.context
    if (deepEqual(center, nextProps.center) && zoom === nextProps.zoom) return
    // If `mapPosition` has changed, update URL query string to new value
    const newQuery = assign({}, nextProps.location.query, {
      z: nextProps.zoom && roundTo(nextProps.zoom, 2),
      lng: nextProps.center && roundTo(nextProps.center[0], 4),
      lat: nextProps.center && roundTo(nextProps.center[1], 4)
    })
    const newLocation = assign({}, location, {
      search: null,
      query: newQuery
    })
    router.transitionTo(newLocation)
  }

  render () {
    return <MapView {...this.props} />
  }
}

function mapStateToProps (state) {
  return {
    center: state.mapPosition.center,
    zoom: state.mapPosition.zoom,
    geojson: getMapGeoJSON(state),
    filter: getMapBoxFilter(state),
    fieldMapping: getFieldMapping(state)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onMove: mapPosition => dispatch(moveMap(mapPosition))
  }
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer)
