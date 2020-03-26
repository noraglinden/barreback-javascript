const Position = require('../../models/Position')
const { notFoundMessage } = require('../../error/errorMessages')

const createPosition = async positionName => {
  const maybePosition = await Position.findOne({ name: positionName })

  if (maybePosition) {
    throw new Error('Position already exists')
  }

  newPosition = new Position({ name: positionName })

  await newPosition.save()

  return newPosition
}

const getPositionByName = async positionName => {
  const maybePosition = await Position.findOne({ name: positionName })

  if (positionName && !maybePosition) {
    throw new Error(`No position found for name: ${positionName}`)
  }

  return maybePosition
}

const getPositionById = async positionId => {
  const positionOption = await Position.findById(positionId)

  if (!positionOption) {
    const errorMsg = notFoundMessage('position', positionId)
    throw new Error(errorMsg)
  }
  return positionOption
}

const getPositions = async queryParams => {
  const searchParams = {}

  if (
    queryParams.nameExact !== undefined &&
    queryParams.nameExact === 'false'
  ) {
    searchParams.$text = { $search: queryParams.name }
  } else {
    searchParams.name = queryParams.name
  }

  const positions = await Position.find(searchParams)

  if (positions === undefined || positions.length == 0) {
    throw new Error('No positions found.')
  }
  return positions
}

const hardDeletePositionById = async positionId => {
  const positionToDelete = await Position.deleteOne({ _id: positionId })

  if (positionToDelete.deletedCount === 0) {
    throw new Error(notFoundMessage('position', positionId))
  }

  return {
    msg: `Successfully deleted ${positionToDelete.deletedCount} position: ${positionId}`,
  }
}

module.exports = {
  createPosition,
  getPositionByName,
  getPositions,
  getPositionById,
  hardDeletePositionById,
}
