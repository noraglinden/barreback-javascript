const { CLASSIC } = require('../classes/classTypes')

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

  const defaultClassType = CLASSIC

  //Build Exercise Fields
  const exerciseFields = {}

  //Set User Entry Required Fields
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
  if (pullOff !== null) exerciseFields.pullOff = pullOff
  if (setUp) exerciseFields.setUp = setUp
  if (createdAt) exerciseFields.createdAt = createdAt

  //Set Exercise Active
  if (typeof active == 'undefined') {
    exerciseFields.active = true
  } else {
    exerciseFields.active = active
  }

  //Set Class Type, default of Classic
  classType
    ? (exerciseFields.classType = classType)
    : (exerciseFields.classType = defaultClassType)

  return exerciseFields
}

module.exports.createExercise = createExercise
