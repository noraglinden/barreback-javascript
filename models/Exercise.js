const mongoose = require('mongoose')
const quarters = require('../core/enums/quarters')
const {
  classSections,
  classSectionsByDataRequirementNeeds,
} = require('../core/enums/classSections')
const { classTypes } = require('../core/enums/classTypes')
const { exerciseLocations } = require('../core/enums/exerciseLocations')
const { exerciseRotations } = require('../core/enums/exerciseRotations')
const { exerciseHeights } = require('../core/enums/exerciseHeights')
const { exerciseDirections } = require('../core/enums/exerciseDirections')
const { exerciseEquipmentItems } = require('../core/enums/equipment')
const Schema = mongoose.Schema

/***
 * Exercises vary on class type and section, but can share a lot of information.
 * Validation on user entry ensures that exercises are created correctly before
 * being entered into the database.
 *
 * Required across all exercises:
 *  - Name
 *  - Quarter
 *  - Year
 *  - Section
 *  - Choreography
 *  - Class Type
 *  - Location (Center or barre)
 *  - Active (set to True as default in DB)
 *  - Created At (set on entry)
 *
 * Optional across all exercises:
 *  - Set Up
 *  - Equipment
 *
 * Sections can have pariticlar rules around data needed:
 *
 * Rotation
 *  - Required for Thighs, Arms & Legs, and Seat sections.
 *  - Optional for all other sections.
 *  - If entered, must be of a valid type.
 *
 * Height
 *  - Required for Seat sections.
 *  - Optional for all other sections.
 *  - If entered, must be of a valid type.
 *
 * Position
 *  - Required for Thighs, Arms & Legs, Seat, Core Focus, and Abs Section.
 *  - Optional for all other sections.
 *  - If entered, must be a string. Validation done through query to Positions collection.
 *
 * Direction
 *  - Required for Thighs, Arms & Legs, Core, Seat, Core Focus, Abs & Back Dancing.
 *  - Optional for all other sections.
 *  - If entered, must be a valid type.
 *
 * Pull Off
 *  - Required for Thighs, Arms & Legs, and Seat.
 *  - Optional for all other sections.
 *  - If entered, must be a boolean.
 *
 * Two Sided
 *  - Required for Thighs
 *  - Optional for all other sections
 *  - If entered, must be a boolean
 */

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quarter: {
    type: String,
    required: true,
    enum: quarters.all,
  },
  year: {
    type: Number,
    required: true,
  },
  section: {
    type: String,
    required: true,
    enum: classSections,
  },
  choreography: {
    type: String,
    required: true,
  },
  classType: {
    type: String,
    required: true,
    enum: classTypes,
  },
  location: {
    type: String,
    required: true,
    enum: exerciseLocations,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  setUp: {
    type: String,
  },
  equipment: {
    type: [String],
    enum: exerciseEquipmentItems,
  },
  rotation: {
    type: String,
    enum: exerciseRotations,
    required: function() {
      return classSectionsByDataRequirementNeeds.rotation.includes(this.section)
    },
  },
  height: {
    type: String,
    enum: exerciseHeights,
    required: function() {
      return classSectionsByDataRequirementNeeds.height.includes(this.section)
    },
  },
  position: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'positions',
    },
    name: {
      type: String,
      required: function() {
        return classSectionsByDataRequirementNeeds.position.includes(
          this.section
        )
      },
    },
  },
  direction: {
    type: String,
    enum: exerciseDirections,
    required: function() {
      return classSectionsByDataRequirementNeeds.direction.includes(
        this.section
      )
    },
  },
  pullOff: {
    type: Boolean,
    required: function() {
      return classSectionsByDataRequirementNeeds.pullOff.includes(this.section)
    },
  },
  twoSided: {
    type: Boolean,
    required: function() {
      return classSectionsByDataRequirementNeeds.twoSided.includes(this.section)
    },
  },
})

module.exports = Exercise = mongoose.model('exercise', ExerciseSchema)
