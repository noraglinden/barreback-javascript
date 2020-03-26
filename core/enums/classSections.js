const { classType } = require('../enums/classTypes')
const { classSectionChoice } = require('../enums/classSectionChoices')

const classSection = {
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

const classSections = Object.values(classSection)

const classSectionsByClassType = {
  [classType.CLASSIC]: [
    classSection.WARM_UP,
    classSection.WEIGHT_WORK,
    classSection.THIGHS,
    classSection.SEAT,
    classSection.CORE_FOCUS,
    classSection.ABS,
    classSection.BACK_EXTENSION,
    classSection.BACK_DANCING,
  ],
  [classType.REFORM]: [
    classSection.WARM_UP,
    classSection.TRICEPS,
    classSection.ARMS_AND_LEGS,
    classSection.CORE,
    classSection.SEAT,
    classSection.ABS,
    classSection.BACK_DANCING,
  ],
  [classType.EMPOWER]: [],
}

//todo should this be in class seciton choices
const classSectionChoicesByClassSection = {
  [classSection.WARM_UP]: [classSectionChoice.WARM_UP],
  [classSection.TRICEPS]: [classSectionChoice.TRICEPS],
  [classSection.WEIGHT_WORK]: [classSectionChoice.WEIGHT_WORK],
  [classSection.THIGHS]: [
    classSectionChoice.THIGH_1,
    classSectionChoice.THIGH_2,
    classSectionChoice.THIGH_3,
  ],
  [classSection.ARMS_AND_LEGS]: [
    classSectionChoice.ARMS_LEGS_1,
    classSectionChoice.ARMS_LEGS_2,
    classSectionChoice.ARMS_LEGS_3,
  ],
  [classSection.CORE]: [classSectionChoice.CORE],
  [classSection.SEAT]: [classSectionChoice.SEAT_1, classSectionChoice.SEAT_2],
  [classSection.CORE_FOCUS]: [classSectionChoice.CORE_FOCUS],
  [classSection.ABS]: [
    classSectionChoice.ABS_1,
    classSectionChoice.ABS_2,
    classSectionChoice.ABS_3,
  ],
  [classSection.BACK_EXTENSION]: [classSectionChoice.BACK_EXTENSION],
  [classSection.BACK_DANCING]: [classSectionChoice.BACK_DANCING],
}

const classSectionsByDataRequirementNeeds = {
  position: [
    classSection.THIGHS,
    classSection.ARMS_AND_LEGS,
    classSection.SEAT,
    classSection.CORE_FOCUS,
    classSection.ABS,
  ],
  pullOff: [classSection.THIGHS, classSection.ARMS_AND_LEGS, classSection.SEAT],
  twoSided: [classSection.THIGHS],
  direction: [
    classSection.THIGHS,
    classSection.ARMS_AND_LEGS,
    classSection.CORE,
    classSection.SEAT,
    classSection.CORE_FOCUS,
    classSection.ABS,
    classSection.BACK_DANCING,
  ],
  height: [classSection.SEAT],
  rotation: [
    classSection.THIGHS,
    classSection.ARMS_AND_LEGS,
    classSection.SEAT,
  ],
}

module.exports = {
  classSection,
  classSections,
  classSectionsByDataRequirementNeeds,
  classSectionsByClassType,
  classSectionChoicesByClassSection,
}
