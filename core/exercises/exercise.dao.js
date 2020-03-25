const Exercise = require('../../models/Exercise')
const { notFoundMessage } = require('../../error/errorMessages')

const createExercise = async (req, maybePosition) => {
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

  newExercise = new Exercise(exerciseFields)

  await newExercise.save()

  return newExercise
}

const getExercises = async queryParams => {
  const exercises = await Exercise.find(queryParams)

  if (exercises === undefined || exercises.length == 0) {
    throw new Error('No exercises found.')
  }

  return exercises
}

const getExerciseById = async exerciseId => {
  const exerciseOption = await Exercise.findById(exerciseId)

  if (!exerciseOption) {
    throw new Error(notFoundMessage('exercise', exerciseId))
  }

  return exerciseOption
}

const hardDeleteExerciseById = async exerciseId => {
  const exerciseToDelete = await Exercise.deleteOne({ _id: exerciseId })

  if (exerciseToDelete.deletedCount === 0) {
    throw new Error(notFoundMessage('exercise', exerciseId))
  }

  return {
    msg: `Successfully deleted ${exerciseToDelete.deletedCount} exercise: ${exerciseId}`,
  }
}

module.exports = {
  createExercise: createExercise,
  getExercises: getExercises,
  getExerciseById: getExerciseById,
  hardDeleteExerciseById: hardDeleteExerciseById,
}
