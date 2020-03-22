const express = require('express')
const router = express.Router()
const { createExercise } = require('../core/exercises/createExercise')
const Exercise = require('../models/Exercise')
const Position = require('../models/Position')
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

const getPosition = async (req, res) => {
  const positionName = req.body.position

  const maybePosition = await Position.findOne({ name: positionName })

  if (positionName && !maybePosition) {
    return res
      .status(404)
      .json({ msg: `No position found for ${positionName}` })
  }

  return maybePosition
}

// Create a new Exercise
//todo reduce duplicate exercises
//todo create more than one Exercise at a time
router.post('/', async (req, res) => {
  try {
    const maybePosition = await getPosition(req, res)
    const exerciseFields = createExercise(req, maybePosition)
    newExercise = new Exercise(exerciseFields)
    await newExercise.save()
    res.json(newExercise)
  } catch (err) {
    console.log(err)

    const errorMessages = []
    if (err.errors) {
      Object.values(err.errors).map(error =>
        errorMessages.push({ [error.path]: error.message })
      )
    }

    if (errorMessages !== 0) {
      return res.status(400).json({ errors: errorMessages })
    }

    res.status(500).send(errorMessages.serverErrorMessage)
  }
})

//todo edit exercise

//todo delete exercise

module.exports = router
