const { body } = require('express-validator')
const exerciseConstant = require('./exercise.constants')
const classTypes = require('../enums/classTypes')
const classSections = require('../enums/classSections')
const quarters = require('../enums/quarters')

const REQUIRED = 'is required'
const STRING = 'must be a string'
const NUMERIC = 'must be numeric'
const BOOLEAN = 'must be a boolean'

//todo: check for optional createdAt is date
//todo: make class type not case specific
const createExerciseRules = () => {
  return [
    body(exerciseConstant.NAME)
      .not()
      .isEmpty()
      .withMessage(`${exerciseConstant.NAME} ${REQUIRED}`),
    body(exerciseConstant.NAME)
      .isString()
      .withMessage(`${exerciseConstant.NAME} ${STRING}`),
    body(exerciseConstant.QUARTER)
      .not()
      .isEmpty()
      .withMessage(`${exerciseConstant.QUARTER} ${REQUIRED}`),
    body(exerciseConstant.QUARTER)
      .isIn(quarters.all)
      .withMessage(
        `${exerciseConstant.QUARTER} must be of valid types: ${quarters.all}`
      ),
    body(exerciseConstant.YEAR)
      .not()
      .isEmpty()
      .withMessage(`${exerciseConstant.YEAR} ${REQUIRED}`),
    body(exerciseConstant.YEAR)
      .isInt()
      .withMessage(`${exerciseConstant.YEAR} ${NUMERIC}`),
    body(exerciseConstant.SECTION)
      .not()
      .isEmpty()
      .withMessage(`${exerciseConstant.SECTION} ${REQUIRED}`),
    body(exerciseConstant.SECTION)
      .isIn(classSections.all)
      .withMessage(
        `${exerciseConstant.SECTION} must be of valid types: ${classSections.all}`
      ),
    body(exerciseConstant.CHOREOGRAPHY)
      .not()
      .isEmpty()
      .withMessage(`${exerciseConstant.CHOREOGRAPHY} ${REQUIRED}`),
    body(exerciseConstant.CHOREOGRAPHY)
      .isString()
      .withMessage(`${exerciseConstant.CHOREOGRAPHY} ${STRING}`),
    body(exerciseConstant.LOCATION)
      .optional()
      .isString()
      .withMessage(`${exerciseConstant.LOCATION} ${STRING}`),
    body(exerciseConstant.DIRECTION)
      .optional()
      .isString()
      .withMessage(`${exerciseConstant.DIRECTION} ${STRING}`),
    body(exerciseConstant.EQUIPMENT)
      .optional()
      .isString()
      .withMessage(`${exerciseConstant.EQUIPMENT} ${STRING}`),
    body(exerciseConstant.ROTATION)
      .optional()
      .isString()
      .withMessage(`${exerciseConstant.ROTATION} ${STRING}`),
    body(exerciseConstant.HEIGHT)
      .optional()
      .isString()
      .withMessage(`${exerciseConstant.HEIGHT} ${STRING}`),
    body(exerciseConstant.POSITION)
      .optional()
      .isString()
      .withMessage(`${exerciseConstant.POSITION} ${STRING}`),
    body(exerciseConstant.PULL_OFF)
      .optional()
      .isBoolean()
      .withMessage(`${exerciseConstant.PULL_OFF} ${BOOLEAN}`),
    body(exerciseConstant.SET_UP)
      .optional()
      .isString()
      .withMessage(`${exerciseConstant.SET_UP} ${STRING}`),
    body(exerciseConstant.ACTIVE)
      .optional()
      .isBoolean()
      .withMessage(`${exerciseConstant.ACTIVE} ${BOOLEAN}`),
    body(exerciseConstant.CLASS_TYPE)
      .optional()
      .isIn(classTypes.all)
      .withMessage(
        `${exerciseConstant.CLASS_TYPE} must be of valid types: ${classTypes.all}`
      ),
  ]
}

module.exports.createExerciseRules = createExerciseRules
