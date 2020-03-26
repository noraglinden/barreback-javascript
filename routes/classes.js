const express = require('express')
const router = express.Router()
const errorMessages = require('../error/errorMessages')
const { validate } = require('./middleware/validation')
const {
  createClassRules,
  addExerciseToClassRules,
} = require('../core/classes/class.validation')
const {
  createClass,
  getClasses,
  getClassById,
  addExerciseToClass,
} = require('../core/classes/class.dao')
const { getExerciseById } = require('../core/exercises/exercise.dao')

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

// Get Class by Id
router.get('/:classId', async (req, res) => {
  try {
    const clazz = await getClassById(req.params.classId)
    res.json(clazz)
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

//Add Exercise to a class
router.put(
  '/:classId/add/:classSectionChoice',
  addExerciseToClassRules(),
  validate,
  async (req, res) => {
    try {
      const exercise = await getExerciseById(req.body.exerciseId)
      const clazz = await getClassById(req.params.classId)
      const uppdatedClass = await addExerciseToClass(
        req.params.classSectionChoice,
        clazz,
        exercise
      )

      res.json(uppdatedClass)
    } catch (err) {
      console.log(err)

      const messages = errorMessages.getErrorMessages(err)
      if (messages !== 0) {
        return res.status(400).json({ errors: messages })
      }

      res.status(500).send(errorMessages.serverErrorMessage)
    }
  }
)

module.exports = router
