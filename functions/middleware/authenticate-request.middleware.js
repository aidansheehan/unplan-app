const admin = require('firebase-admin')

/**
 * Authenticates request and attaches user ID to request object
 */
const authenticateRequestMiddleware = async (req, res, next) => {

    // Get auth token authorization bearer
    const authToken = req.headers.authorization?.split('Bearer ')[1]

    // If auth token not found
    if (!authToken) {

        // Return unauthorized error
        return res.status(403).send('Unauthorized')
    }

    try {
        const decodedToken  = await admin.auth().verifyIdToken(authToken)   // Decode token
        
        // Attach user object to request
        req.user = { uid: decodedToken.uid, isAnonymous: decodedToken.firebase.sign_in_provider === 'anonymous' }
        next()                                                              // Proceed to next middleware or function
    } catch (error) {
        return res.status(403).send('Invalid token')
    }
}

module.exports = authenticateRequestMiddleware