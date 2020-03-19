const { body } = require('express-validator')
const exerciseConstant = require('./exercise.constants')

const REQUIRED = 'is required'
const STRING = 'must be a string'
const NUMERIC = 'must be numeric'
const BOOLEAN = 'must be a boolean'

//todo: check for optional createdAt is date
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
      .isString()
      .withMessage(`${exerciseConstant.QUARTER} ${STRING}`),
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
      .isString()
      .withMessage(`${exerciseConstant.SECTION} ${STRING}`),
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
      .isString()
      .withMessage(`${exerciseConstant.CLASS_TYPE} ${STRING}`),
  ]
}

module.exports.createExerciseRules = createExerciseRules
