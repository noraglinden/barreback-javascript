const { body } = require('express-validator')
const exerciseConstant = require('./exercise.constants')
const classTypes = require('../enums/classTypes')
const classSections = require('../enums/classSections')
const quarters = require('../enums/quarters')
const exerciseLocations = require('../enums/exerciseLocations')
const exerciseDirections = require('../enums/exerciseDirections')
const equipment = require('../enums/equipment')
const exerciseRotations = require('../enums/exerciseRotations')
const exerciseHeights = require('../enums/exerciseHeights')

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
 *
 * Optional across all exercises:
 *  - Set Up
 *  - Equipment
 *  - Active (set to True as default in DB)
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
 */

//todo: check for optional createdAt is date
//todo: make all not case specific

const REQUIRED = 'is required'
const NOT_REQUIRED = 'is not required'
const STRING = 'must be a string'
const NUMERIC = 'must be numeric'
const BOOLEAN = 'must be a boolean'
const VALID = 'must be of valid types:'

const createExerciseRules = () => {
  return [
    //Required for all exercises
    nameRules,
    quarterRules,
    yearRules,
    sectionRules,
    choreographyRules,
    classTypeRules,
    locationRules,
    //Optional for all exercises
    setUpRules,
    equipmentRules,
    activeRules,
    //Specific - Rotation
    rotationOptionalRules,
    rotationRequiredRules,
    //Specific - Height
    heightOptionalRules,
    heightRequiredRules,
    //Specific - Position
    positionOptionalRules,
    positionRequiredRules,
    //Specific - Direction
    directionOptionalRules,
    directionRequiredRules,
    //Specific - Pull Off
    pullOffOptionalRules,
    pullOffRequiredRules,
  ]
}

const getSpecificRules = (
  required,
  targetToCheck,
  sections,
  validValues,
  message
) =>
  required
    ? body(targetToCheck)
        .if(body(exerciseConstant.SECTION).isIn(sections))
        .exists({ checkFalsy: true })
        .withMessage(message)
        .bail()
        .isIn(validValues)
        .withMessage(message)
    : body(targetToCheck)
        .if(body(exerciseConstant.SECTION).isIn(sections))
        .optional()
        .isIn(validValues)
        .withMessage(message)

/***
 * Required for all exercises
 */

//Name is required and must be a string
const nameRules = body(exerciseConstant.NAME)
  .exists({ checkFalsy: true })
  .withMessage(`${exerciseConstant.NAME} ${REQUIRED} and ${STRING}`)
  .bail()
  .isString()
  .withMessage(`${exerciseConstant.NAME} ${STRING}`)

//Quarter is required and must be a valid quarter
const quarterRules = body(exerciseConstant.QUARTER)
  .exists({ checkFalsy: true })
  .withMessage(
    `${exerciseConstant.QUARTER} ${REQUIRED} and ${VALID} ${quarters.all}`
  )
  .bail()
  .isIn(quarters.all)
  .withMessage(`${exerciseConstant.QUARTER} ${VALID} ${quarters.all}`)

//Year is required and must be numeric
const yearRules = body(exerciseConstant.YEAR)
  .exists({ checkFalsy: true })
  .withMessage(`${exerciseConstant.YEAR} ${REQUIRED} and ${NUMERIC}`)
  .bail()
  .isInt()
  .withMessage(`${exerciseConstant.YEAR} ${NUMERIC}`)

//Section is required and must be a valid section
const sectionRules = body(exerciseConstant.SECTION)
  .exists({ checkFalsy: true })
  .withMessage(
    `${exerciseConstant.SECTION} ${REQUIRED} and ${VALID} ${classSections.all}`
  )
  .bail()
  .isIn(classSections.all)
  .withMessage(`${exerciseConstant.SECTION} ${VALID} ${classSections.all}`)

//Choreography is required and must be a string
const choreographyRules = body(exerciseConstant.CHOREOGRAPHY)
  .exists({ checkFalsy: true })
  .withMessage(`${exerciseConstant.CHOREOGRAPHY} ${REQUIRED} and ${STRING}`)
  .bail()
  .isString()
  .withMessage(`${exerciseConstant.CHOREOGRAPHY} ${STRING}`)

//Class Type is required and must be a valid vlass Type
const classTypeRules = body(exerciseConstant.CLASS_TYPE)
  .exists({ checkFalsy: true })
  .withMessage(
    `${exerciseConstant.CLASS_TYPE} ${REQUIRED} and ${VALID} ${classTypes.all}`
  )
  .bail()
  .isIn(classTypes.all)
  .withMessage(`${exerciseConstant.CLASS_TYPE} ${VALID} ${classTypes.all}`)

//Location is required and must be a valid location
const locationRules = body(exerciseConstant.LOCATION)
  .exists({ checkFalsy: true })
  .withMessage(
    `${exerciseConstant.LOCATION} ${REQUIRED} and ${VALID} ${exerciseLocations.all}`
  )
  .bail()
  .isIn(exerciseLocations.all)
  .withMessage(`${exerciseConstant.LOCATION} ${VALID} ${exerciseLocations.all}`)

/***
 * Optional for all exercises
 */

//Set Up is optional but must be a string
const setUpRules = body(exerciseConstant.SET_UP)
  .optional()
  .isString()
  .withMessage(`${exerciseConstant.SET_UP} ${STRING}`)

//Equipment is optional but must be an array and include valid equipment
const equipmentRules = body(exerciseConstant.EQUIPMENT)
  .optional()
  .isArray()
  .custom(equipmentList => {
    return equipmentList.every(item => equipment.all.includes(item))
  })
  .withMessage(`${exerciseConstant.EQUIPMENT} ${VALID} ${equipment.all}`)

//Active is optional and set to default True on db creation
const activeRules = body(exerciseConstant.ACTIVE)
  .optional()
  .isBoolean()
  .withMessage(`${exerciseConstant.ACTIVE} ${BOOLEAN}`)

/***
 * Specific rules for Rotation
 */

//Rotation is not required for all sections but must be a valid rotation
const rotationOptionalRules = getSpecificRules(
  false,
  exerciseConstant.ROTATION,
  exerciseRotations.sectionDoesNotRequireRotation,
  exerciseRotations.all,
  `${exerciseConstant.ROTATION} ${NOT_REQUIRED} for sections: ${exerciseRotations.sectionDoesNotRequireRotation} but ${VALID} ${exerciseRotations.all}`
)

//Rotation is required for certain sections and must be a valid roation
const rotationRequiredRules = getSpecificRules(
  true,
  exerciseConstant.ROTATION,
  exerciseRotations.sectionRequiresRotation,
  exerciseRotations.all,
  `${exerciseConstant.ROTATION} ${REQUIRED} for sections: ${exerciseRotations.sectionRequiresRotation} and ${VALID} ${exerciseRotations.all}`
)

/***
 * Sepcific rules for Height
 */

//Height is not required for all sections but must be a valid height
const heightOptionalRules = getSpecificRules(
  false,
  exerciseConstant.HEIGHT,
  exerciseHeights.sectionDoesNotRequireHeight,
  exerciseHeights.all,
  `${exerciseConstant.HEIGHT} ${NOT_REQUIRED} for sections: ${exerciseHeights.sectionDoesNotRequireHeight} but ${VALID} ${exerciseHeights.all}`
)
//Height is required for Seat section and must be a valid height

const heightRequiredRules = getSpecificRules(
  true,
  exerciseConstant.HEIGHT,
  exerciseHeights.sectionRequiresHeight,
  exerciseHeights.all,
  `${exerciseConstant.HEIGHT} ${REQUIRED} for sections: ${exerciseHeights.sectionRequiresHeight} and ${VALID} ${exerciseHeights.all}`
)

/***
 * Specific rules for Position
 */

//Position is not required for some sections but must be a string
const positionOptionalRules = body(exerciseConstant.POSITION)
  .if(
    body(exerciseConstant.SECTION).isIn(
      classSections.sectionDoesNotRequirePosition
    )
  )
  .optional()
  .isString()
  .withMessage(
    `${exerciseConstant.POSITION} ${NOT_REQUIRED} for sections: ${classSections.sectionDoesNotRequirePosition} but ${STRING}`
  )

//Position is required for some sections and must be a string
const positionRequiredRules = body(exerciseConstant.POSITION)
  .if(
    body(exerciseConstant.SECTION).isIn(classSections.sectionRequiresPosition)
  )
  .exists({ checkFalsy: true })
  .withMessage(
    `${exerciseConstant.POSITION} ${REQUIRED} for sections: ${classSections.sectionRequiresPosition} and ${STRING}`
  )
  .bail()
  .isString()
  .withMessage(`${exerciseConstant.POSITION} ${STRING}`)

/**
 * Specific rules for Direction
 */

//Direction is not required for some sections but must be a valid direction
const directionOptionalRules = getSpecificRules(
  false,
  exerciseConstant.DIRECTION,
  exerciseDirections.sectionDoesNotRequireDirection,
  exerciseDirections.all,
  `${exerciseConstant.DIRECTION} ${NOT_REQUIRED} for sections: ${exerciseDirections.sectionDoesNotRequireDirection} but ${VALID} ${exerciseDirections.all}`
)

//Direction is required for some sections and must be a valid direction
const directionRequiredRules = getSpecificRules(
  true,
  exerciseConstant.DIRECTION,
  exerciseDirections.sectionRequiresDirection,
  exerciseDirections.all,
  `${exerciseConstant.DIRECTION} ${REQUIRED} for sections: ${exerciseDirections.sectionRequiresDirection} and ${VALID} ${exerciseDirections.all}`
)

/***
 *  Specific Rules - Pull Off
 */

//Pull off is not required for all sections but must be a boolean
const pullOffOptionalRules = body(exerciseConstant.PULL_OFF)
  .if(
    body(exerciseConstant.SECTION).isIn(
      classSections.sectionDoesNotRequirePullOff
    )
  )
  .optional()
  .isBoolean()
  .withMessage(`${exerciseConstant.PULL_OFF} ${BOOLEAN}`)

//Pull off is required for some sections and must be a boolean
const pullOffRequiredRules = body(exerciseConstant.PULL_OFF)
  .if(body(exerciseConstant.SECTION).isIn(classSections.sectionRequiresPullOff))
  .exists({ checkFalsy: true })
  .withMessage(
    `${exerciseConstant.PULL_OFF} ${REQUIRED} for sections: ${classSections.sectionRequiresPullOff} and ${BOOLEAN}`
  )
  .isBoolean()
  .withMessage(`${exerciseConstant.PULL_OFF} ${BOOLEAN}`)

module.exports.createExerciseRules = createExerciseRules
