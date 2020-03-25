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

const classicSections = [
  section.WARM_UP,
  section.WEIGHT_WORK,
  section.THIGHS,
  section.SEAT,
  section.CORE_FOCUS,
  section.ABS,
  section.BACK_EXTENSION,
  section.BACK_DANCING,
]

const reformSections = [
  section.WARM_UP,
  section.TRICEPS,
  section.ARMS_AND_LEGS,
  section.CORE,
  section.SEAT,
  section.ABS,
  section.BACK_DANCING,
]

const sectionRequiresPosition = [
  section.THIGHS,
  section.ARMS_AND_LEGS,
  section.SEAT,
  section.CORE_FOCUS,
  section.ABS,
]

const sectionRequiresPullOff = [
  section.THIGHS,
  section.ARMS_AND_LEGS,
  section.SEAT,
]

const sectionRequiresTwoSided = [section.THIGHS]

module.exports = {
  section,
  all,
  sectionRequiresPosition,
  sectionRequiresPullOff,
  sectionRequiresTwoSided,
  classicSections,
  reformSections,
}
