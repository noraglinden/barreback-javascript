const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  quarter: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  classType: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
  },
  equipment: {
    type: [String],
  },
  rotation: {
    type: String,
  },
  height: {
    type: String,
  },
  position: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'positions',
    },
    name: {
      type: String,
    },
  },
  pullOff: {
    type: Boolean,
  },
  setUp: {
    type: String,
  },
  choreography: {
    type: String,
    required: true,
  },
})

module.exports = Exercise = mongoose.model('exercise', ExerciseSchema)
