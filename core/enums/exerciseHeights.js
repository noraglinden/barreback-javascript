const clazz = require('./classSections')

const height = {
  HIGH: 'high',
  MID: 'medium',
  LOW: 'low',
}

const all = [height.HIGH, height.MID, height.low]

const sectionRequiresHeight = [clazz.section.SEAT]

module.exports = {
  height,
  all,
  sectionRequiresHeight,
}
