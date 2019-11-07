const { body } = require('express-validator')
const exConst = require('../../domain/exercises/exerciseConstants')

const REQUIRED = 'is required'
const STRING = 'must be a string'
const NUMERIC = 'must be numeric'
const BOOLEAN = 'must be a boolean'

//todo: check for optional createdAt is date
const createExerciseValidationRules = () => {
  return [
    body(exConst.NAME)
      .not()
      .isEmpty()
      .withMessage(`${exConst.NAME} ${REQUIRED}`),
    body(exConst.NAME)
      .isString()
      .withMessage(`${exConst.NAME} ${STRING}`),
    body(exConst.QUARTER)
      .not()
      .isEmpty()
      .withMessage(`${exConst.QUARTER} ${REQUIRED}`),
    body(exConst.QUARTER)
      .isString()
      .withMessage(`${exConst.QUARTER} ${STRING}`),
    body(exConst.YEAR)
      .not()
      .isEmpty()
      .withMessage(`${exConst.YEAR} ${REQUIRED}`),
    body(exConst.YEAR)
      .isInt()
      .withMessage(`${exConst.YEAR} ${NUMERIC}`),
    body(exConst.SECTION)
      .not()
      .isEmpty()
      .withMessage(`${exConst.SECTION} ${REQUIRED}`),
    body(exConst.SECTION)
      .isString()
      .withMessage(`${exConst.SECTION} ${STRING}`),
    body(exConst.CHOREOGRAPHY)
      .not()
      .isEmpty()
      .withMessage(`${exConst.CHOREOGRAPHY} ${REQUIRED}`),
    body(exConst.CHOREOGRAPHY)
      .isString()
      .withMessage(`${exConst.CHOREOGRAPHY} ${STRING}`),
    body(exConst.LOCATION)
      .optional()
      .isString()
      .withMessage(`${exConst.LOCATION} ${STRING}`),
    body(exConst.DIRECTION)
      .optional()
      .isString()
      .withMessage(`${exConst.DIRECTION} ${STRING}`),
    body(exConst.EQUIPMENT)
      .optional()
      .isString()
      .withMessage(`${exConst.EQUIPMENT} ${STRING}`),
    body(exConst.ROTATION)
      .optional()
      .isString()
      .withMessage(`${exConst.ROTATION} ${STRING}`),
    body(exConst.HEIGHT)
      .optional()
      .isString()
      .withMessage(`${exConst.HEIGHT} ${STRING}`),
    body(exConst.POSITION)
      .optional()
      .isString()
      .withMessage(`${exConst.POSITION} ${STRING}`),
    body(exConst.PULL_OFF)
      .optional()
      .isBoolean()
      .withMessage(`${exConst.PULL_OFF} ${BOOLEAN}`),
    body(exConst.SET_UP)
      .optional()
      .isString()
      .withMessage(`${exConst.SET_UP} ${STRING}`),
    body(exConst.ACTIVE)
      .optional()
      .isBoolean()
      .withMessage(`${exConst.ACTIVE} ${BOOLEAN}`),
    body(exConst.CLASS_TYPE)
      .optional()
      .isString()
      .withMessage(`${exConst.CLASS_TYPE} ${STRING}`),
  ]
}

module.exports.createExerciseValidationRules = createExerciseValidationRules
