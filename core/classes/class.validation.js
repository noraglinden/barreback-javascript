const { body, param } = require('express-validator')
const classConstant = require('./class.constants')
const { classTypes } = require('../enums/classTypes')
const { classSectionChoices } = require('../../core/enums/classSectionChoices')

//todo make not case specific
const createClassRules = () => {
  return [
    body(classConstant.CLASS_TYPE)
      .not()
      .isEmpty()
      .withMessage('Class Type is required'),
    body(classConstant.CLASS_TYPE)
      .isIn(classTypes)
      .withMessage(`Class Type must be of valid types: ${classTypes}`),
  ]
}

const addExerciseToClassRules = () => {
  return [
    param('classSectionChoice')
      .isIn(classSectionChoices)
      .withMessage(`Must be a valid section choice: ${classSectionChoices}`),
    body('exerciseId')
      .exists({ checkFalsy: true })
      .withMessage('Exercise Id is required.'),
  ]
}

module.exports = {
  createClassRules,
  addExerciseToClassRules,
}
