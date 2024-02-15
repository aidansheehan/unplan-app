const functions = require('firebase-functions')
const { httpMethodRestrictorMiddleware } = require('../../middleware/http-method-restrictor.middleware')
const cors = require('cors')({ origin: true })
const admin = require('firebase-admin')

const db = admin.firestore()

/**
 * Function to get user lessons
 */
const getUserLessons = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        httpMethodRestrictorMiddleware(['GET'])(req, res, async () => {
            
            // Authenticate request
            const authToken = req.headers.authorization?.split('Bearer ')[1]
            if (!authToken) {
                return res.status(403).send('Unauthorized')
            }

            let uid;    // Init auth token

            try {
                const decodedToken  = await admin.auth().verifyIdToken(authToken)    // Decode token
                uid                 = decodedToken.uid                              // Get user ID
            } catch (error) {
                return res.status(403).send('Invalid token')
            }

            //Query DB for lesson plans matching user ID
            const lessonsSnapshot = await db.collection('lessons').where('uid', '==', uid).get()

            const lessons = []  //Init lesson plans

            // Push retrieved lesson plans to lessonPlans array
            lessonsSnapshot.forEach(doc => lessons.push({ id: doc.id, ...doc.data() }))

            // Respond with the lessons data in JSON format and a 200 OK status
            return res.status(200).json(lessons)

        })
    })
})

module.exports = { getUserLessons }