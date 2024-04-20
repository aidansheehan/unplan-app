const admin = require('firebase-admin')

//Initialize firebase app
admin.initializeApp()

//Connect to emulator db if functions emulated
if (process.env.FUNCTIONS_EMULATOR) {
  admin.firestore().settings({
    host: 'localhost:8080',
    ssl: false
  })
}

const { createLessonPlan }                      = require('./api/lesson-plans/create-lesson-plan')
const { generateLessonPlan }                    = require('./api/lesson-plans/generate-lesson-plan')
const { createStudentHandout }                  = require('./api/lesson-plans/create-student-handout')
const { generateFindSomeoneWhoWorksheet }       = require('./api/activities/generate-find-someone-who')
const { generateGrammarVocabularyWorksheet }    = require('./api/activities/generate-grammar-vocabulary-worksheet')
const { generateReadingComprehensionWorksheet } = require('./api/activities/generate-reading-comprehension-worksheet')
const { getLessons }                            = require('./api/content-management/get-lessons')
const { getUserLessons }                        = require('./api/content-management/get-user-lessons')
const { getContent }                            = require('./api/content-management/get-content')
const { updateContent }                         = require('./api/content-management/update-content')
const { getActivities }                         = require('./api/content-management/get-activities')
const { trackSignUp }                           = require('./analytics/track-sign-up')

/** Lesson Plan Functions */
exports.createLessonPlan                      = createLessonPlan
exports.generateLessonPlan                    = generateLessonPlan
exports.createStudentHandout                  = createStudentHandout

/** Activity Worksheet Functions */
exports.generateFindSomeoneWhoWorksheet       = generateFindSomeoneWhoWorksheet
exports.generateGrammarVocabularyWorksheet    = generateGrammarVocabularyWorksheet
exports.generateReadingComprehensionWorksheet = generateReadingComprehensionWorksheet

/** Content Management Functions */
exports.getLessons        = getLessons
exports.getUserLessons    = getUserLessons
exports.getContent        = getContent
exports.updateContent     = updateContent
exports.getActivities     = getActivities

/** Analytics Functions */
exports.trackSignUp = trackSignUp