const clazz = require('./classSections')

const direction = {
  CENTER: 'Center',
  BARRE: 'Barre',
  PROFILE: 'Profile',
  FRONT: 'Front Mirror',
  SIDE: 'Side Mirror',
  OPPOSITE_SIDE: 'Opposite Side Mirror',
}

const all = [
  direction.CENTER,
  direction.BARRE,
  direction.PROFILE,
  direction.FRONT,
  direction.SIDE,
  direction.OPPOSITE_SIDE,
]

const sectionRequiresDirection = [
  clazz.section.THIGHS,
  clazz.section.ARMS_AND_LEGS,
  clazz.section.CORE,
  clazz.section.SEAT,
  clazz.section.CORE_FOCUS,
  clazz.section.ABS,
  clazz.section.BACK_DANCING,
]

const sectionDoesNotRequireDirection = clazz.all.filter(section => {
  return !sectionRequiresDirection.includes(section)
})

module.exports = {
  direction,
  all,
  sectionRequiresDirection,
  sectionDoesNotRequireDirection,
}
