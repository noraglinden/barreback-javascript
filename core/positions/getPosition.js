const Position = require('../../models/Position')

const getPosition = async req => {
  const positionName = req.body.position

  const maybePosition = await Position.findOne({ name: positionName })

  if (positionName && !maybePosition) {
    return res
      .status(404)
      .json({ msg: `No position found for ${positionName}` })
  }
}

module.exports.getPosition = getPosition
