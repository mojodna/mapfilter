const assign = require('object-assign')
const omit = require('lodash/omit')

const filters = (state = {}, {type, payload = {}}) => {
  const {key, exp, val} = payload
  switch (type) {
    case 'UPDATE_FILTER':
      let filter

      if (key == null && exp == null && val == null) {
        return payload
      }

      if (!val) {
        filter = omit(state[key], exp)
        if (!Object.keys(filter).length) {
          return omit(state, key)
        }
      } else {
        filter = assign({}, state[key], {
          [exp]: val
        })
      }

      return assign({}, state, {
        [key]: filter
      })

    default:
      return state
  }
}

module.exports = filters
