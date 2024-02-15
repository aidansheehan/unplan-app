const functions = require('firebase-functions')
const { httpMethodRestrictorMiddleware } = require('../../middleware/http-method-restrictor.middleware')
const cors = require('cors')({ origin: true })
const admin = require('firebase-admin')
const authenticateRequestMiddleware = require('../../middleware/authenticate-request.middleware')

const db = admin.firestore()

/**
 * Function to get user lessons
 */
const getUserLessons = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        httpMethodRestrictorMiddleware(['GET'])(req, res, async () => {
            authenticateRequestMiddleware(req, res, async () => {

                const { uid } = req // Extract user ID from request

                try {
                    //Query DB for lesson plans matching user ID
                    const lessonsSnapshot = await db.collection('lessons').where('uid', '==', uid).get()

                    const lessons = []  //Init lesson plans

                    // Push retrieved lesson plans to lessonPlans array
                    lessonsSnapshot.forEach(doc => lessons.push({ id: doc.id, ...doc.data() }))

                    // Respond with the lessons data in JSON format and a 200 OK status
                    return res.status(200).json(lessons)
                } catch (error) {
                    console.error(error)
                    return res.status(404).send('Lessons not found')
                }

            })

        })
    })
})

module.exports = { getUserLessons }