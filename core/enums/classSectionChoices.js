const choices = {
  WARM_UP: 'warmUp',
  TRICEPS: 'triceps',
  WEIGHT_WORK: 'weightWork',
  THIGH_1: 'thigh1',
  THIGH_2: 'thigh2',
  THIGH_3: 'thigh3',
  ARMS_LEGS_1: 'armsLegs1',
  ARMS_LEGS_2: 'armsLegs2',
  ARMS_LEGS_3: 'armsLegs3',
  CORE: 'core',
  SEAT_1: 'seat1',
  SEAT_2: 'seat2',
  CORE_FOCUS: 'coreFocus',
  ABS_1: 'abs1',
  ABS_2: 'abs2',
  ABS_3: 'abs3',
  BACK_EXTENSION: 'backExtension',
  BACK_DANCING: 'backDancing',
}

const all = Object.values(choices)

module.exports = {
  choices,
  all,
}
