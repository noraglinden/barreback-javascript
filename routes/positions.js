const express = require('express')
const router = express.Router()
const errorMessages = require('../error/errorMessages')
const { validate } = require('./middleware/validation')
const { createPositionRules } = require('../core/positions/position.validation')
const {
  createPosition,
  getPositions,
  getPositionById,
} = require('../core/positions/position.dao')

//Get all positions
//todo: figure out why only sending Not Found
router.get('/', async (req, res) => {
  try {
    const positions = await getPositions()
    res.json(positions)
  } catch (err) {
    console.log(err)

    const messages = errorMessages.getErrorMessages(err)
    if (messages !== 0) {
      return res.status(400).json({ errors: messages })
    }

    res.status(500).send(errorMessages.serverErrorMessage)
  }
})

//Get a position by Id
router.get('/:positionId', async (req, res) => {
  try {
    const positionOption = await getPositionById(req.params.positionId)
    res.json(positionOption)
  } catch (err) {
    console.log(err)

    const messages = errorMessages.getErrorMessages(err)
    if (messages !== 0) {
      return res.status(400).json({ errors: messages })
    }

    res.status(500).send(errorMessages.serverErrorMessage)
  }
})

//Create a position
router.post('/', createPositionRules(), validate, async (req, res) => {
  try {
    const newPosition = await createPosition(req.body.name)
    res.json(newPosition)
  } catch (err) {
    console.log(err)

    const messages = errorMessages.getErrorMessages(err)
    if (messages !== 0) {
      return res.status(400).json({ errors: messages })
    }

    res.status(500).send(errorMessages.serverErrorMessage)
  }
})

//todo delete position

module.exports = router
