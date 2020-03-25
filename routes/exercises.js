const express = require('express')
const router = express.Router()
const { createExercise } = require('../core/exercises/createExercise')
const Exercise = require('../models/Exercise')
const errorMessages = require('../error/errorMessages')
const { getPositionByName } = require('../core/positions/position.dao')

// Get all Exercises with optional query params
router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find(req.query)
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
//todo create more than one Exercise at a time
router.post('/', async (req, res) => {
  try {
    const maybePosition = await getPositionByName(req.body.position)
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

    if (err.message) {
      errorMessages.push({ error: err.message })
    }

    if (errorMessages !== 0) {
      return res.status(400).json({ errors: errorMessages })
    }

    res.status(500).send(errorMessages.serverErrorMessage)
  }
})

//todo edit exercise

//todo: add auth and potentially hard and soft delete - add deleted field
//todo delete exercise by Id
router.delete('/:exerciseId', async (req, res) => {
  const exerciseId = req.params.exerciseId
  const notFoundMsg = errorMessages.notFoundMessage('exercise', exerciseId)
  try {
    const deletedOption = await Exercise.deleteOne({ _id: exerciseId })

    if (!deletedOption) {
      res.status(404).json({ msg: `${notFoundMsg}` })
    }

    res.json(deletedOption)
  } catch (err) {
    console.log(err)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: `${notFoundMsg}` })
    }
    res.status(500).send(errorMessages.serverErrorMessage)
  }
})

module.exports = router
