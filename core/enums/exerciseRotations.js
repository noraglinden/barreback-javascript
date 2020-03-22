const clazz = require('./classSections')

const rotation = {
  TURNOUT: 'turnout',
  PARALLEL: 'parallel',
}

const all = [rotation.TURNOUT, rotation.PARALLEL]

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
