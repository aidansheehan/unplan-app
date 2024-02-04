const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })
const admin = require('firebase-admin')
const { httpMethodRestrictorMiddleware } = require('../../middleware/http-method-restrictor.middleware')

const db = admin.firestore()

/**
 * Function to fetch activities from firestore
 */
const getActivities = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        httpMethodRestrictorMiddleware(['GET'])(req, res, async () => {

            // Check if the 'ids' query parameter is not provided or if it's empty
            if (!req.query.ids && req.query.ids.length) {
                // If 'ids' is not provided or is empty, return an empty array with a 200 OK status
                return res.status(200).json([])
            }
            
            // Split the 'ids' query parameter by commas and filter out any empty strings
            const ids = req.query.ids.split(',').filter(id => id.trim() !== '')
            
            // Check if there are no valid IDs after filtering
            if (ids.length === 0) {
                // Return an empty array with a 200 OK status if no valid IDs are found
                return res.status(200).json([])
            }
            
            // Create an array of promises, each fetching an activity document by its id
            const activitiesPromises = ids.map(id => db.collection('activities').doc(id).get())

            // Await the resolution of all promises
            const activitiesSnapshots = await Promise.all(activitiesPromises)
            
            // Filter out any snapshots that do not exist and map each to a JSON object
            const activities = activitiesSnapshots
                .filter(snapshot => snapshot.exists)
                .map(snapshot => ({
                id: snapshot.id,
                ...snapshot.data()
                }))
            
            // Send the array of activities as a response with a 200 OK status
            return res.status(200).json(activities)
        })
    })
})

module.exports = { getActivities }