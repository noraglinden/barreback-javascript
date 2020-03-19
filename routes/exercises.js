const express = require('express')
const router = express.Router()
const { createExercise } = require('../core/exercises/createExercise')
const Exercise = require('../models/Exercise')
const { createExerciseRules } = require('../core/exercises/exercise.validation')
const { validate } = require('./middleware/validation')

// Get all Exercises
router.get('/', async (req, res) => {
  const exercises = await Exercise.find()
  res.json(exercises)
})

// Create a new Exercise
//todo reduce duplicate exercises
router.post('/', createExerciseRules(), validate, async (req, res) => {
  try {
    const exerciseFields = createExercise(req)
    newExercise = new Exercise(exerciseFields)
    await newExercise.save()
    res.json(newExercise)
  } catch (err) {
    console.log(err)
    res.sendStatus(500).send('Server Error')
  }
})

module.exports = router
