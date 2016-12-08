const updateFilter = (filter) => {
  return {
    type: 'UPDATE_FILTER',
    payload: filter
  }
}

const addVisibleFilter = (filter) => {
  return {
    type: 'ADD_VISIBLE_FILTER',
    payload: filter
  }
}

const removeVisibleFilter = (filter) => {
  return {
    type: 'REMOVE_VISIBLE_FILTER',
    payload: filter
  }
}

const moveMap = (payload) => {
  return {
    type: 'MOVE_MAP',
    payload
  }
}

const replaceFeatures = (payload) => {
  return {
    type: 'REPLACE_FEATURES',
    payload
  }
}

const addFeatures = (payload) => {
  return {
    type: 'ADD_FEATURES',
    payload: Array.isArray(payload) ? payload : [payload]
  }
}

const openFilterConfigurator = () => {
  return {
    type: 'OPEN_FILTER_CONFIGURATOR'
  }
}

const closeFilterConfigurator = () => {
  return {
    type: 'CLOSE_FILTER_CONFIGURATOR'
  }
}

module.exports = {
  updateFilter,
  addVisibleFilter,
  removeVisibleFilter,
  moveMap,
  replaceFeatures,
  addFeatures,
  openFilterConfigurator,
  closeFilterConfigurator
}
