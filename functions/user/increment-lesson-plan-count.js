const functions = require('firebase-functions')
const admin = require('firebase-admin')

/**
 * Increment lesson plan counter
 */
exports.updateLessonPlansCreated = functions.firestore
    .document('lessons/{lessonPlanId}')
    .onCreate(async (snap, context) => {
        // Get the userId from the created lesson plan
        const userId = snap.data().uid

        // Reference to the user's document
        const userRef = admin.firestore().doc(`Users/${userId}`)

        try {
            // Run a transaction to increment the lessonPlanCount field
            await admin.firestore().runTransaction(async (transaction) => {
                const userDoc = await transaction.get(userRef)
                if (!userDoc.exists) {
                    throw new Error("User document does not exist!")
                }

                const currentCount = userDoc.data().updateLessonPlansCreated || 0

                transaction.update(userRef, { lessonPlanCount: currentCount + 1 })

            })

            console.log(`Incremeneted lessonPlanCount for user ${userId}`)
        } catch (err) {
            console.error('Error updating lessonPlanCount: ', err)
            throw new functions.https.HttpsError('unknown', 'failed to update lessonPlanCount')
        }
    })