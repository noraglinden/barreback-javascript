const clazz = require('./classSections')

const height = {
  HIGH: 'high',
  MID: 'medium',
  LOW: 'low',
}

const all = Object.values(height)

const sectionRequiresHeight = [clazz.section.SEAT]

module.exports = {
  height,
  all,
  sectionRequiresHeight,
}
