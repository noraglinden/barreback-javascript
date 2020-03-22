const classTypes = require('../enums/classTypes')

const createExercise = (req, maybePosition) => {
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
    pullOff,
    twoSided,
    setUp,
    choreography,
  } = req.body

  //Build Exercise Fields
  const exerciseFields = {}

  //Set User Entry Required Fields
  //todo: change exercise name to be combo of information
  exerciseFields.name = name
  exerciseFields.quarter = quarter
  exerciseFields.year = year
  exerciseFields.section = section
  exerciseFields.choreography = choreography
  exerciseFields.classType = classType

  //Set optional position
  if (maybePosition) {
    const exercisePosition = {}
    exercisePosition.id = maybePosition._id
    exercisePosition.name = maybePosition.name
    exerciseFields.position = exercisePosition
  }

  //Set User Entry Optional Fields
  if (active) exerciseFields.active = active
  if (location) exerciseFields.location = location
  if (direction) exerciseFields.direction = direction
  //todo why is equipment always being added as an empty list
  if (equipment) exerciseFields.equipment = equipment
  if (rotation) exerciseFields.rotation = rotation
  if (height) exerciseFields.height = height
  if (pullOff !== undefined) exerciseFields.pullOff = pullOff
  if (twoSided !== undefined) exerciseFields.twoSided = twoSided
  if (setUp) exerciseFields.setUp = setUp
  if (createdAt) exerciseFields.createdAt = createdAt

  return exerciseFields
}

module.exports.createExercise = createExercise
