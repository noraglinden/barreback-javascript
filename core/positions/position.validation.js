const { body } = require('express-validator')

const createPositionRules = () => {
  return [
    body('name')
      .exists({ checkFalsy: true })
      .withMessage('Name is required'),
  ]
}

module.exports = { createPositionRules }
