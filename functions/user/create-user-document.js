const functions = require('firebase-functions')
const admin = require('firebase-admin')

/**
 * Create user document on sign up for additional info
 */
exports.createUserDocument = functions.auth.user().onCreate((user) => {

    const db = admin.firestore()

    // Set up initial data for the user document
    const initialData = {
        lessonPlanCount: 0
    }

    // Create a document in the `Users` collection with the UID as the document ID
    return db.collection('Users').doc(user.uid).set(initialData)
        .then(() => console.log(`Document created for user ${user.uid}`))
        .catch((error) => console.error(`Error creating document for user ${user.uid}:`, error));
})
