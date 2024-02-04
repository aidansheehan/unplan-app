
/**
 * Middleware to restrict HTTP methods to a function
 */
const httpMethodRestrictorMiddleware = (allowedMethods) => {
    return (req, res, next) => {
        if (!allowedMethods.includes(req.method)) {
            res.status(405).send(`Method ${req.method} Not Allowed`)
            return
        }
        next()
    }
}

module.exports = { httpMethodRestrictorMiddleware }