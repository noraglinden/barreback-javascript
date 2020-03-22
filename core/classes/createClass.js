const classStatuses = require('../enums/classStatuses')

const createClass = req => {
  //Build Class Fields
  const classFields = {}

  classFields.classType = req.body.classType
  classFields.status = classStatuses.status.CREATED

  return classFields
}

module.exports.createClass = createClass
