const express = require('express')
const router = express.Router()
const {
  createExercise,
  getExercises,
  getExerciseById,
  hardDeleteExerciseById,
} = require('../core/exercises/exercise.dao')
const errorMessages = require('../error/errorMessages')
const { getPositionByName } = require('../core/positions/position.dao')

// Get all Exercises with optional query params
router.get('/', async (req, res) => {
  try {
    const exercises = await getExercises(req.query)
    res.json(exercises)
  } catch (err) {
    console.log(err)

    const messages = errorMessages.getErrorMessages(err)
    if (messages !== 0) {
      return res.status(400).json({ errors: messages })
    }

    res.status(500).send(errorMessages.serverErrorMessage)
  }
})

// Get Exercise by Id
router.get('/:exerciseId', async (req, res) => {
  try {
    const exerciseOption = await getExerciseById(req.params.exerciseId)
    res.json(exerciseOption)
  } catch (err) {
    console.log(err)

    const messages = errorMessages.getErrorMessages(err)
    if (messages !== 0) {
      return res.status(400).json({ errors: messages })
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
    const newExercise = await createExercise(req, maybePosition)
    res.json(newExercise)
  } catch (err) {
    console.log(err)

    const messages = errorMessages.getErrorMessages(err)
    if (messages !== 0) {
      return res.status(400).json({ errors: messages })
    }

    res.status(500).send(errorMessages.serverErrorMessage)
  }
})

//todo edit exercise

//Delete an Exercise
//todo: add auth and potentially hard and soft delete - add deleted field
router.delete('/:exerciseId', async (req, res) => {
  try {
    const deletedOption = await hardDeleteExerciseById(req.params.exerciseId)
    res.json(deletedOption)
  } catch (err) {
    console.log(err)

    const messages = errorMessages.getErrorMessages(err)
    if (messages !== 0) {
      return res.status(400).json({ errors: messages })
    }

    res.status(500).send(errorMessages.serverErrorMessage)
  }
})

module.exports = router
