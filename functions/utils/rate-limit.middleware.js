const { FirebaseFunctionsRateLimiter } = require('firebase-functions-rate-limiter')
const { sendRateLimitEmail } = require('./rate-limit-mailer')
const rateLimitConfig = require('../config/rate-limit-config')
const admin = require('firebase-admin')

const db = admin.firestore()

/**
 * Middleware to apply rate limiting to a function
 */
const rateLimitMiddleware = async (functionName, req, res, next) => {

    //Get rate limit config
    const config = rateLimitConfig[functionName]

    //No config
    if (!config) {
        console.error('Rate limit configuration not found for:', functionName)
        res.status(500).send('Internal Server Error')
        return
    }

    //Initialize limiter
    const limiter = FirebaseFunctionsRateLimiter.withFirestoreBackend({
        name: config.name,
        periodSeconds: config.periodSeconds,
        maxCalls: config.maxCalls
    }, db)

    //Decide if limited
    const isLimited = await limiter.isQuotaExceededOrRecordUsage()

    //If rate limit exceeded
    if (isLimited) {

        //Send warning email
        await sendRateLimitEmail(functionName)

        //Return error
        res.status(429).send('Too many requests, please try again later')
        return
    }

    next()
}

module.exports = { rateLimitMiddleware }