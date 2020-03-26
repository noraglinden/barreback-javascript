const clazz = require('./classSections')

const rotation = {
  TURNOUT: 'turnout',
  PARALLEL: 'parallel',
}

const all = Object.values(rotation)

const sectionRequiresRotation = [
  clazz.section.THIGHS,
  clazz.section.ARMS_AND_LEGS,
  clazz.section.SEAT,
]

module.exports = {
  rotation,
  all,
  sectionRequiresRotation,
}
