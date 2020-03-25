const Position = require('../../models/Position')

const getPosition = async positionName => {
  const maybePosition = await Position.findOne({ name: positionName })

  if (positionName && !maybePosition) {
    throw new Error(`No position found for ${positionName}`)
  }

  return maybePosition
}

module.exports.getPosition = getPosition
