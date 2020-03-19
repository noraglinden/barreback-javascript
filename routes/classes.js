const express = require('express')
const router = express.Router()
const Class = require('../models/Class')
const errorMessages = require('../error/errorMessages')
const { validate } = require('./middleware/validation')
const { createClassRules } = require('../core/classes/class.validation')
const { createClass } = require('../core/classes/createClass')

// Get all Classes
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find()
    if (classes === undefined || classes.length === 0) {
      res.json({ msg: 'No classes found.' })
    }
    res.json(classes)
  } catch (err) {
    console.log(err)
    res.sendStatus(500).send(errorMessages.serverErrorMessage)
  }
})

// Create a new Class
router.post('/', createClassRules(), validate, async (req, res) => {
  try {
    const classFields = createClass(req)
    newClass = new Class(classFields)
    await newClass.save()
    res.json(newClass)
  } catch (err) {
    console.log(err)
    res.sendStatus(500).send(errorMessages.serverErrorMessage)
  }
})

module.exports = router
