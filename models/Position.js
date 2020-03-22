const mongoose = require('mongoose')

const PositionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

module.exports = Class = mongoose.model('position', PositionSchema)
