const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })
const { rateLimitMiddleware } = require('../../utils/rate-limit.middleware')
const { httpMethodRestrictorMiddleware } = require('../../middleware/http-method-restrictor.middleware')
const admin = require('firebase-admin')
const { FieldValue } = require('@google-cloud/firestore')
const db = admin.firestore()

/**
 * Function to create a new lesson plan in DB
 */
const createLessonPlan = functions.https.onRequest(async (req, res) => {
    cors(req, res, () => {
        httpMethodRestrictorMiddleware(['POST'])(req, res, () => {
            rateLimitMiddleware('createLessonPlan', req, res, async () => {
            
                //Extract inputs
                const { topic, level, duration, objectives, ageGroup, isOneToOne, isOnline } = req.body;
        
                // Validate inputs
                if (typeof topic !== 'string' || topic.length > 50 ||
                    typeof level !== 'string' || level.length > 20 ||
                        typeof objectives !== 'string' || objectives.length > 400 ||
                            typeof ageGroup !== 'string' || ageGroup.length > 20 ||
                            typeof isOneToOne !== 'boolean' || typeof isOnline !== 'boolean') {
                    res.status(400).send('Invalid input parameters');
                    return;
                }
        
                //Create firestore document
                const docRef = await db.collection('lessons').add({
                    topic, level, duration, objectives, ageGroup, isOneToOne, isOnline,
                    contentRef: {},
                    status: 'pending',
                    createdAt: FieldValue.serverTimestamp()
                })
        
                res.status(200).json({ lessonId: docRef.id })
            })
        })
    })
})

module.exports = { createLessonPlan }