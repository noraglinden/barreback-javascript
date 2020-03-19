const classTypes = require('../enums/classTypes')

const createExercise = req => {
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

  //Build Exercise Fields
  const exerciseFields = {}

  //Set User Entry Required Fields
  //todo: change exercise name to be combo of information
  exerciseFields.name = name
  exerciseFields.quarter = quarter
  exerciseFields.year = year
  exerciseFields.section = section
  exerciseFields.choreography = choreography

  //Set User Entry Optional Fields
  if (location) exerciseFields.location = location
  if (direction) exerciseFields.direction = direction
  if (equipment)
    exerciseFields.equipment = equipment.split(',').map(item => item.trim())
  if (rotation) exerciseFields.rotation = rotation
  if (height) exerciseFields.height = height
  if (position) exerciseFields.position = position
  if (pullOff !== undefined) exerciseFields.pullOff = pullOff
  if (setUp) exerciseFields.setUp = setUp
  if (createdAt) exerciseFields.createdAt = createdAt

  //Set Exercise Active
  if (active === undefined) {
    exerciseFields.active = true
  } else {
    exerciseFields.active = active
  }

  //Set Class Type, default of Classic
  if (classType === undefined) {
    exerciseFields.classType = classTypes.type.CLASSIC
  } else {
    exerciseFields.classType = classType
  }

  return exerciseFields
}

module.exports.createExercise = createExercise
