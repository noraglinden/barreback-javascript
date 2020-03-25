const express = require('express')
const router = express.Router()
const errorMessages = require('../error/errorMessages')
const { validate } = require('./middleware/validation')
const { createClassRules } = require('../core/classes/class.validation')
const { createClass, getClasses } = require('../core/classes/class.dao')

// Get all Classes
router.get('/', async (req, res) => {
  try {
    const classes = await getClasses()
    res.json(classes)
  } catch (err) {
    console.log(err)

    const messages = errorMessages.getErrorMessages(err)
    if (messages !== 0) {
      return res.status(400).json({ errors: messages })
    }

    res.status(500).send(errorMessages.serverErrorMessage)
  }
})

// Create a new Class
router.post('/', createClassRules(), validate, async (req, res) => {
  try {
    const newClass = await createClass(req)
    res.json(newClass)
  } catch (err) {
    console.log(err)
    res.status(500).send(errorMessages.serverErrorMessage)
  }
})

module.exports = router
