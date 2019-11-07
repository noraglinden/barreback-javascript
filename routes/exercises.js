const express = require('express')
const router = express.Router()

const Exercise = require('../models/Exercise')

router.get('/', (req, res) => {
  res.send('exercise route')
})

// Create a new Exercise
//todo validation of entry
//todo reduce duplicate exercises
router.post('/', async (req, res) => {
  const {
    name,
    active,
    quarter,
    year,
    createdAt,
    classType,
    section,
    location,
    direction,
    equipment,
    rotation,
    height,
    position,
    pullOff,
    setUp,
    choreography,
  } = req.body

  const defaultClassType = 'Classic'

  const exerciseFields = {}
  exerciseFields.name = name
  if (typeof active == 'undefined') {
    exerciseFields.active = true
  } else {
    exerciseFields.active = active
  }
  exerciseFields.quarter = quarter
  exerciseFields.year = year
  if (createdAt) exerciseFields.createdAt = createdAt
  classType
    ? (exerciseFields.classType = classType)
    : (exerciseFields.classType = defaultClassType)
  exerciseFields.section = section
  if (location) exerciseFields.location = location
  if (direction) exerciseFields.direction = direction
  if (equipment)
    exerciseFields.equipment = equipment.split(',').map(item => item.trim())
  if (rotation) exerciseFields.rotation = rotation
  if (height) exerciseFields.height = height
  if (position) exerciseFields.position = position
  if (pullOff !== null) exerciseFields.pullOff = pullOff
  if (setUp) exerciseFields.setUp = setUp
  exerciseFields.choreography = choreography

  try {
    newExercise = new Exercise(exerciseFields)
    await newExercise.save()
    res.json(newExercise)
  } catch (err) {
    console.log(err)
    res.sendStatus(500).send('Server Error')
  }
})

module.exports = router
