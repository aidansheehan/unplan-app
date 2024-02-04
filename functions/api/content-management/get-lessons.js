const functions = require('firebase-functions')
const { httpMethodRestrictorMiddleware } = require('../../middleware/http-method-restrictor.middleware')
const cors = require('cors')({ origin: true })
const admin = require('firebase-admin')

const db = admin.firestore()

/**
 * Function to get lessons
 */
const getLessons = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        httpMethodRestrictorMiddleware(['GET'])(req, res, async () => {
            
            // Check if the 'public' query parameter is set to 'true'
            if (req.query.public === 'true') {
                const publicLessonsQuery    = db.collection('lessons').where('public', '==', true)  //Query the database for lessons where the 'public' field is true
                const publicLessonsSnapshot = await publicLessonsQuery.get()                        // Execute the query and await the result
                
                // Transform the query result into a usable format
                const publicLessons         = publicLessonsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                    }))

                // Respond with the public lessons data in JSON format and a 200 OK status
                return res.status(200).json(publicLessons)
            }

            // Check if the 'ids' query parameter is missing or has no length
            if (!req.query.ids || !req.query.ids.length) {
                return res.status(200).json([]) // Respond with an empty array in JSON format and a 200 OK status
            }

            // Split the 'ids' query parameter by commas and filter out any empty strings
            const ids = req.query.ids.split(',').filter(id => id.trim() !== '')

            // Check if the array of ids is empty after filtering
            if (ids.length === 0) {
              return res.status(200).json([])  // Respond with an empty array in JSON format and a 200 OK status
            }

            const lessonsPromises   = ids.map(id => db.collection('lessons').doc(id).get())     // Create an array of promises, each fetching a lesson by its id
            const lessonsSnapshots  = await Promise.all(lessonsPromises)                        // Await all the promises to resolve

            // Filter out any non-existent snapshots and transform the result into a usable format
            const lessons = lessonsSnapshots
                .filter(snapshot => snapshot.exists)
                .map(snapshot => ({
                id: snapshot.id,
                ...snapshot.data()
                }))

            // Respond with the lessons data in JSON format and a 200 OK status
            return res.status(200).json(lessons)
        })
    })
})

module.exports = { getLessons }