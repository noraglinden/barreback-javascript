const mongoose = require('mongoose')
const Schema = mongoose.Schema
const classTypes = require('../core/enums/classTypes')

//todo add Schedule info

const ClassSchema = new mongoose.Schema({
  status: {
    type: String,
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
    enum: classTypes.all,
  },
  warmUp: {
    exercise: {
      type: Schema.Types.ObjectId,
      ref: 'exercises',
    },
    name: {
      type: String,
    },
  },
  triceps: {
    exercise: {
      type: Schema.Types.ObjectId,
      ref: 'exercises',
    },
    name: {
      type: String,
    },
  },
  weightWork: {
    exercise: {
      type: Schema.Types.ObjectId,
      ref: 'exercises',
    },
    name: {
      type: String,
    },
  },
  thigh1: {
    exercise: {
      type: Schema.Types.ObjectId,
      ref: 'exercises',
    },
    name: {
      type: String,
    },
  },
  thigh2: {
    exercise: {
      type: Schema.Types.ObjectId,
      ref: 'exercises',
    },
    name: {
      type: String,
    },
  },
  thigh3: {
    exercise: {
      type: Schema.Types.ObjectId,
      ref: 'exercises',
    },
    name: {
      type: String,
    },
  },
  armsLegs1: {
    exercise: {
      type: Schema.Types.ObjectId,
      ref: 'exercises',
    },
    name: {
      type: String,
    },
  },
  armsLegs2: {
    exercise: {
      type: Schema.Types.ObjectId,
      ref: 'exercises',
    },
    name: {
      type: String,
    },
  },
  armsLegs3: {
    exercise: {
      type: Schema.Types.ObjectId,
      ref: 'exercises',
    },
    name: {
      type: String,
    },
  },
  core: {
    exercise: {
      type: Schema.Types.ObjectId,
      ref: 'exercises',
    },
    name: {
      type: String,
    },
  },
  seat1: {
    exercise: {
      type: Schema.Types.ObjectId,
      ref: 'exercises',
    },
    name: {
      type: String,
    },
  },
  seat2: {
    exercise: {
      type: Schema.Types.ObjectId,
      ref: 'exercises',
    },
    name: {
      type: String,
    },
  },
  coreFocus: {
    exercise: {
      type: Schema.Types.ObjectId,
      ref: 'exercises',
    },
    name: {
      type: String,
    },
  },
  abs1: {
    exercise: {
      type: Schema.Types.ObjectId,
      ref: 'exercises',
    },
    name: {
      type: String,
    },
  },
  abs2: {
    exercise: {
      type: Schema.Types.ObjectId,
      ref: 'exercises',
    },
    name: {
      type: String,
    },
  },
  abs3: {
    exercise: {
      type: Schema.Types.ObjectId,
      ref: 'exercises',
    },
    name: {
      type: String,
    },
  },
  backExtension: {
    exercise: {
      type: Schema.Types.ObjectId,
      ref: 'exercises',
    },
    name: {
      type: String,
    },
  },
  backDancing: {
    exercise: {
      type: Schema.Types.ObjectId,
      ref: 'exercises',
    },
    name: {
      type: String,
    },
  },
})

module.exports = Class = mongoose.model('class', ClassSchema)
