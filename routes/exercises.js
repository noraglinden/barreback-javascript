const express = require('express')
const router = express.Router()
const { createExercise } = require('../core/exercises/createExercise')
const Exercise = require('../models/Exercise')
const {
  createExerciseValidationRules,
} = require('../core/exercises/exercise.validation')
const { validate } = require('./middleware/validation')

router.get('/', (req, res) => {
  res.send('exercise route')
})

// Create a new Exercise
//todo validation of entry
//todo reduce duplicate exercises
router.post(
  '/',
  createExerciseValidationRules(),
  validate,
  async (req, res) => {
    try {
      const exerciseFields = createExercise(req)
      newExercise = new Exercise(exerciseFields)
      await newExercise.save()
      res.json(newExercise)
    } catch (err) {
      console.log(err)
      res.sendStatus(500).send('Server Error')
    }
  }
)

module.exports = router
