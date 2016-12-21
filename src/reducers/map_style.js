const mapStyles = (state = [], {type, payload = {}}) => {
  switch (type) {
    case 'REPLACE_MAP_STYLE':
      return payload

    default:
      return state
  }
}

module.exports = mapStyles
