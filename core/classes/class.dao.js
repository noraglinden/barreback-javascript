const { classStatus } = require('../enums/classStatuses')
const Class = require('../../models/Class')
const { notFoundMessage } = require('../../error/errorMessages')
const {
  checkAddExerciseToClassValid,
} = require('../classes/planningLogic/addExerciseToClass')

const createClass = async req => {
  //Build Class Fields
  const classFields = {}

  classFields.classType = req.body.classType
  classFields.status = classStatus.CREATED

  newClass = new Class(classFields)
  await newClass.save()

  return newClass
}

const getClasses = async () => {
  const classes = await Class.find()
  if (classes === undefined || classes.length === 0) {
    throw new Error('No classes found.')
  }
  return classes
}

const getClassById = async classId => {
  const clazz = await Class.findById(classId)

  if (!clazz) {
    throw new Error(notFoundMessage('class', classId))
  }

  return clazz
}

const addExerciseToClass = async (sectionChoice, clazz, exercise) => {
  checkAddExerciseToClassValid(sectionChoice, clazz, exercise)

  const updateFields = {
    exercise: exercise._id,
    name: exercise.name,
    section: exercise.section,
  }

  const updatedClass = await Class.findByIdAndUpdate(
    clazz._id,
    {
      [sectionChoice]: updateFields,
    },
    { new: true }
  )

  return updatedClass
}

module.exports = { createClass, getClasses, getClassById, addExerciseToClass }
