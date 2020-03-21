const express = require('express')
const router = express.Router()
const errorMessages = require('../error/errorMessages')
const Position = require('../models/Position')
const { validate } = require('./middleware/validation')
const { createPositionRules } = require('../core/positions/position.validation')

//Get all positions
//todo: figure out why only sending Not Found
router.get('/', async (req, res) => {
  try {
    const positions = await Position.find()
    if (positions === undefined || positions.length == 0) {
      res.json({ msg: 'No positions found.' })
    }
    res.json(positions)
  } catch (err) {
    console.log(err)
    res.status(500).send(errorMessages.serverErrorMessage)
  }
})

//Get a position by Id
router.get('/:positionId', async (req, res) => {
  const positionId = req.params.positionId
  const notFoundMsg = errorMessages.notFoundMessage('position', positionId)
  try {
    const positionOption = await Position.findById(positionId)

    if (!positionOption) {
      res.status(404).json({ msg: `${notFoundMsg}` })
    }

    res.json(positionOption)
  } catch (err) {
    console.log(err)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: `${notFoundMsg}` })
    }
    res.status(500).send(errorMessages.serverErrorMessage)
  }
})

//Create a position
router.post('/', createPositionRules(), validate, async (req, res) => {
  try {
    const positionName = req.body.name

    const maybePosition = await Position.findOne({ name: positionName })

    if (maybePosition) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Position already exists' }] })
    }

    newPosition = new Position({ name: positionName })
    await newPosition.save()
    res.json(newPosition)
  } catch (err) {
    console.log(err)
    res.status(500).send(errorMessages.serverErrorMessage)
  }
})

//todo delete position

module.exports = router
