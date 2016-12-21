const FIELD_TYPES = {
  STRING: 'string',
  BOOLEAN: 'boolean',
  NUMBER: 'number',
  DATE: 'date',
  MIXED: 'mixed',
  UUID: 'uuid',
  IMAGE: 'image',
  VIDEO: 'video',
  MEDIA: 'media',
  LINK: 'link',
  ARRAY: 'array',
  STRING_OR_ARRAY: 'string_or_array',
  NUMBER_OR_ARRAY: 'number_or_array'
}

const FILTER_TYPES = {
  DISCRETE: 'DISCRETE',
  RANGE: 'RANGE',
  DATE: 'DATE',
  TEXT: 'TEXT'
}

module.exports = {
  FIELD_TYPES,
  FILTER_TYPES
}
