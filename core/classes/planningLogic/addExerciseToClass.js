const {
  classSectionChoicesByClassType,
} = require('../../enums/classSectionChoices')
const {
  classSectionsByClassType,
  classSectionChoicesByClassSection,
} = require('../../enums/classSections')

/***
 * To add an exercise to a class, you need to ensure that:
 *  - The Exercise is of the same Class Type as the Class
 *  - The Exercise Section is a valid Section for the Class Class Type
 *  - The chosen Section Choice for the Exercise is a valid
 *      section choice for the Class Class Type
 *  - The chosen Section Choice for the Exercise is a valid section choice
 *      for the Excersise Section
 */
const checkAddExerciseToClassValid = (sectionChoice, clazz, exercise) => {
  const exerciseClassTypeMatchesClassClassType =
    exercise.classType === clazz.classType

  if (!exerciseClassTypeMatchesClassClassType) {
    throw new Error(
      `Unable to add Exercise ${exercise._id} to Class ${clazz._id}: Class Types do not match - Exercise: ${exercise.classType}, Class: ${clazz.classType}.`
    )
  }

  const exerciseSectionValidForClassClassType = classSectionsByClassType[
    clazz.classType
  ].includes(exercise.section)

  if (!exerciseSectionValidForClassClassType) {
    throw new Error(
      `Unable to add Exercise ${exercise._id} to Class ${clazz._id}: Exercise Section not valid for Class Class Type - Exercise: ${exercise.section}, Class: ${clazz.classType}.`
    )
  }

  const sectionChoiceValidForClassClassType = classSectionChoicesByClassType[
    clazz.classType
  ].includes(sectionChoice)

  if (!sectionChoiceValidForClassClassType) {
    throw new Error(
      `Unable to add Exercise ${exercise._id} to Class ${clazz._id}: Section choice not valid for Class Class Type - Section Choice: ${sectionChoice}, Class: ${clazz.classType}.`
    )
  }

  const sectionChoiceValidForExerciseSection = classSectionChoicesByClassSection[
    exercise.section
  ].includes(sectionChoice)

  if (!sectionChoiceValidForExerciseSection) {
    throw new Error(
      `Unable to add Exercise ${exercise._id} to Class ${clazz._id}: Section choice not valid for Exercise Section - Section Choice: ${sectionChoice}, Exercise: ${exercise.section}.`
    )
  }

  return true
}

module.exports = { checkAddExerciseToClassValid }
