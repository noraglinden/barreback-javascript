const classStatuses = require('../enums/classStatuses')
const Class = require('../../models/Class')

const createClass = async req => {
  //Build Class Fields
  const classFields = {}

  classFields.classType = req.body.classType
  classFields.status = classStatuses.status.CREATED

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

module.exports = { createClass: createClass, getClasses: getClasses }
