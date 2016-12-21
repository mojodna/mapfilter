'use strict';

var updateFilter = function updateFilter(filter) {
  return {
    type: 'UPDATE_FILTER',
    payload: filter
  };
};

var removeFilter = function removeFilter(filter) {
  return {
    type: 'REMOVE_FILTER',
    payload: filter
  };
};

var updateVisibleFilters = function updateVisibleFilters(payload) {
  return {
    type: 'UPDATE_VISIBLE_FILTERS',
    payload: payload
  };
};

var moveMap = function moveMap(payload) {
  return {
    type: 'MOVE_MAP',
    payload: payload
  };
};

var replaceFeatures = function replaceFeatures(payload) {
  return {
    type: 'REPLACE_FEATURES',
    payload: payload
  };
};

var addFeatures = function addFeatures(payload) {
  return {
    type: 'ADD_FEATURES',
    payload: Array.isArray(payload) ? payload : [payload]
  };
};

var replaceMapStyle = function replaceMapStyle(payload) {
  return {
    type: 'REPLACE_MAP_STYLE',
    payload: payload
  };
};

module.exports = {
  updateFilter: updateFilter,
  removeFilter: removeFilter,
  updateVisibleFilters: updateVisibleFilters,
  moveMap: moveMap,
  replaceFeatures: replaceFeatures,
  addFeatures: addFeatures,
  replaceMapStyle: replaceMapStyle
};