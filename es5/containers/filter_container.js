'use strict';

var _require = require('react-redux'),
    connect = _require.connect;

var FilterView = require('../components/filter');

var _require2 = require('../action_creators'),
    updateFilter = _require2.updateFilter;

var getFilterProps = require('../selectors/filter_props');

function mapDispatchToProps(dispatch) {
  return {
    onUpdateFilter: function onUpdateFilter(filter) {
      return dispatch(updateFilter(filter));
    }
  };
}

module.exports = connect(getFilterProps, mapDispatchToProps)(FilterView);