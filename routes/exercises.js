const express = require('express')
const router = express.Router()
const { createExercise } = require('../core/exercises/createExercise')
const Exercise = require('../models/Exercise')
const Position = require('../models/Position')
const { createExerciseRules } = require('../core/exercises/exercise.validation')
const { validate } = require('./middleware/validation')
const errorMessages = require('../error/errorMessages')

// Get all Exercises
router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find()
    if (exercises === undefined || exercises.length == 0) {
      res.json({ msg: 'No exercises found.' })
    }
    res.json(exercises)
  } catch (err) {
    console.log(err)
    res.status(500).send(errorMessages.serverErrorMessage)
  }
})

// Get Exercise by Id
router.get('/:exerciseId', async (req, res) => {
  const exerciseId = req.params.exerciseId
  const notFoundMsg = errorMessages.notFoundMessage('exercise', exerciseId)
  try {
    const exerciseOption = await Exercise.findById(exerciseId)

    if (!exerciseOption) {
      res.status(404).json({ msg: `${notFoundMsg}` })
    }

    res.json(exerciseOption)
  } catch (err) {
    console.log(err)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: `${notFoundMsg}` })
    }
    res.status(500).send(errorMessages.serverErrorMessage)
  }
})

// Create a new Exercise
//todo reduce duplicate exercises
router.post('/', createExerciseRules(), validate, async (req, res) => {
  try {
    const positionName = req.body.position

    const maybePosition = await Position.findOne({ name: positionName })

    if (positionName && !maybePosition) {
      return res
        .status(404)
        .json({ msg: `No position found for ${positionName}` })
    }

    const exerciseFields = createExercise(req, maybePosition)
    newExercise = new Exercise(exerciseFields)
    await newExercise.save()
    res.json(newExercise)
  } catch (err) {
    console.log(err)
    res.status(500).send(errorMessages.serverErrorMessage)
  }
})

//todo edit exercise

//todo delete exercise

module.exports = router
