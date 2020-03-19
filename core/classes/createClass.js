const classTypes = require('../enums/classTypes')
const classStatuses = require('../enums/classStatuses')

const createClass = req => {
  const {
    status,
    createdAt,
    classType,
    warmUp,
    triceps,
    weightWork,
    thigh1,
    thigh2,
    thigh3,
    armsLegs1,
    armsLegs2,
    armsLegs3,
    core,
    seat1,
    seat2,
    coreFocus,
    abs1,
    abs2,
    abs3,
    backExtension,
    backDancing,
  } = req.body

  //Build Class Fields
  const classFields = {}

  //Set User Entry Required Fields
  classFields.classType = classType

  //Set Class Status, default of Created
  if (status === undefined) {
    classFields.status = classStatuses.CREATED
  } else {
    classFields.status = status
  }

  return classFields
}

module.exports.createClass = createClass
