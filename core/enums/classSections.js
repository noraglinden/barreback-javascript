const section = {
  WARM_UP: 'Warm Up',
  TRICEPS: 'Triceps',
  WEIGHT_WORK: 'Weight Work',
  THIGHS: 'Thighs',
  ARMS_AND_LEGS: 'Arms & Legs',
  CORE: 'Core',
  SEAT: 'Seat',
  CORE_FOCUS: 'Core Focus',
  ABS: 'Abs',
  BACK_EXTENSION: 'Back Extension',
  BACK_DANCING: 'Back Dancing',
}

const all = [
  section.WARM_UP,
  section.TRICEPS,
  section.WEIGHT_WORK,
  section.THIGHS,
  section.ARMS_AND_LEGS,
  section.CORE,
  section.SEAT,
  section.CORE_FOCUS,
  section.ABS,
  section.BACK_EXTENSION,
  section.BACK_DANCING,
]

const sectionRequiresPosition = [
  section.THIGHS,
  section.ARMS_AND_LEGS,
  section.SEAT,
  section.CORE_FOCUS,
  section.ABS,
]

const sectionDoesNotRequirePosition = all.filter(section => {
  return !sectionRequiresPosition.includes(section)
})

const sectionRequiresPullOff = [
  section.THIGHS,
  section.ARMS_AND_LEGS,
  section.SEAT,
]

const sectionDoesNotRequirePullOff = all.filter(section => {
  return !sectionRequiresPullOff.includes(section)
})

const sectionRequiresTwoSided = [section.THIGHS]

const sectionDoesNotRequireTwoSided = all.filter(section => {
  return !sectionRequiresTwoSided.includes(section)
})

module.exports = {
  section,
  all,
  sectionRequiresPosition,
  sectionDoesNotRequirePosition,
  sectionRequiresPullOff,
  sectionDoesNotRequirePullOff,
  sectionRequiresTwoSided,
  sectionDoesNotRequireTwoSided,
}
