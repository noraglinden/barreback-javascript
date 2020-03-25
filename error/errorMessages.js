const getErrorMessages = err => {
  const errorMessages = []

  if (err.errors) {
    Object.values(err.errors).map(error =>
      errorMessages.push({ [error.path]: error.message })
    )
  }

  if (err.message && err.kind === 'ObjectId') {
    errorMessages.push({ msg: `Id ${err.value} is not a valid ObjectId.` })
  } else if (err.message) {
    errorMessages.push({ msg: err.message })
  }

  return errorMessages
}

module.exports = {
  notFoundMessage: (type, id) => `No ${type} found for id: ${id}.`,
  serverErrorMessage: 'Server Error',
  getErrorMessages: getErrorMessages,
}
