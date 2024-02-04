const functions = require('firebase-functions')
const cors = require('cors')({origin: true})
const admin = require('firebase-admin')
const { httpMethodRestrictorMiddleware } = require('../../middleware/http-method-restrictor.middleware')

const storage = admin.storage()

/**
 * Function to update content in storage
 */
const updateContent = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        httpMethodRestrictorMiddleware(['POST'])(req, res, async () => {

            const { filePath, content } = req.body                          //Extract 'filePath' and 'content' from the request body
            const fileRef               = storage.bucket().file(filePath)   //Create a reference to the specified file in the storage bucket using 'filePath'

            //Save the provided 'content' to the file with specified content type 'text/html'
            await fileRef.save(content, { contentType: 'text/html' })

            //Respond with a status code of 200 OK and a success message in JSON format
            return res.status(200).json({ message: 'Content saved successfully' })
        })
    })
})

module.exports = { updateContent }