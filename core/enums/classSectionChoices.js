const { classType } = require('../enums/classTypes')

const classSectionChoice = {
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

const classSectionChoicesByClassType = {
  [classType.CLASSIC]: [
    classSectionChoice.WARM_UP,
    classSectionChoice.WEIGHT_WORK,
    classSectionChoice.THIGH_1,
    classSectionChoice.THIGH_2,
    classSectionChoice.THIGH_3,
    classSectionChoice.SEAT_1,
    classSectionChoice.SEAT_2,
    classSectionChoice.CORE_FOCUS,
    classSectionChoice.ABS_1,
    classSectionChoice.ABS_2,
    classSectionChoice.ABS_3,
    classSectionChoice.BACK_EXTENSION,
    classSectionChoice.BACK_DANCING,
  ],
  [classType.REFORM]: [
    classSectionChoice.WARM_UP,
    classSectionChoice.TRICEPS,
    classSectionChoice.ARMS_LEGS_1,
    classSectionChoice.ARMS_LEGS_2,
    classSectionChoice.ARMS_LEGS_3,
    classSectionChoice.CORE,
    classSectionChoice.SEAT_1,
    classSectionChoice.SEAT_2,
    classSectionChoice.ABS_1,
    classSectionChoice.ABS_2,
    classSectionChoice.ABS_3,
    classSectionChoice.BACK_DANCING,
  ],
  [classType.EMPOWER]: [],
}

const classSectionChoices = Object.values(classSectionChoice)

module.exports = {
  classSectionChoice,
  classSectionChoices,
  classSectionChoicesByClassType,
}
