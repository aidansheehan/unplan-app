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

                const { uid }   = req                           // Extract user ID from request
                const limit     = parseInt(req.query.limit)     // Optionally get a limit from query parameters

                try {
                    //Query DB for lesson plans matching user ID
                    let query = await db.collection('lessons').where('uid', '==', uid).orderBy('updatedAt', 'desc')

                    // If a limit is specified and it's a number, apply it to the query
                    if (limit && !isNaN(limit)) {
                        query = query.limit(limit)
                    }

                    const lessonsSnapshot = await query.get()

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