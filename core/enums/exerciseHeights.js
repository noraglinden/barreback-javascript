const clazz = require('./classSections')

const height = {
  HIGH: 'high',
  MID: 'medium',
  LOW: 'low',
}

const all = [height.HIGH, height.MID, height.low]

const sectionRequiresHeight = [clazz.section.SEAT]

const sectionDoesNotRequireHeight = clazz.all.filter(section => {
  return !sectionRequiresHeight.includes(section)
})

module.exports = {
  height,
  all,
  sectionRequiresHeight,
  sectionDoesNotRequireHeight,
}
