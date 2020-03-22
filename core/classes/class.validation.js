const { body } = require('express-validator')
const classConstant = require('./class.constants')
const classTypes = require('../enums/classTypes')

//todo make not case specific
const createClassRules = () => {
  return [
    body(classConstant.CLASS_TYPE)
      .not()
      .isEmpty()
      .withMessage('Class Type is required'),
    body(classConstant.CLASS_TYPE)
      .isIn(classTypes.all)
      .withMessage(`Class Type must be of valid types: ${classTypes.all}`),
  ]
}

module.exports.createClassRules = createClassRules
