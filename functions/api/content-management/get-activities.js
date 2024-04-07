const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })
const admin = require('firebase-admin')
const { httpMethodRestrictorMiddleware } = require('../../middleware/http-method-restrictor.middleware')
const authenticateRequestMiddleware = require('../../middleware/authenticate-request.middleware')

const db = admin.firestore()

/**
 * Function to fetch activities from firestore
 */
const getActivities = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        httpMethodRestrictorMiddleware(['GET'])(req, res, async () => {
            authenticateRequestMiddleware(req, res, async () => {

                const { uid }   = req.user                           // Extract user ID from request
                const limit     = parseInt(req.query.limit)     // Optionally get a limit from query parameters

                try {
                    // Query DB for activities matching user ID
                    let query = await db.collection('activities').where('uid', '==', uid).orderBy('updatedAt', 'desc')

                    // If a limit is specified and it's a number, apply it to the query
                    if (limit && !isNaN(limit)) {
                        query = query.limit(limit)
                    }

                    const activitiesSnapshot = await query.get()

                    const activities = []   // Init activities

                    // Push retrieved activities to activities array
                    activitiesSnapshot.forEach(doc => activities.push({ id: doc.id, ...doc.data() }))

                    // Respond with the lessons data in JSON format and a 200 OK status
                    return res.status(200).json(activities)
                } catch (error) {
                    console.error(error)
                    return res.status(404).send('Activities not found')
                }
            })

        })
    })
})

module.exports = { getActivities }