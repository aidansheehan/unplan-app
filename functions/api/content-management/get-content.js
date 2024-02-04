const functions = require('firebase-functions')
const { httpMethodRestrictorMiddleware } = require('../../middleware/http-method-restrictor.middleware')
const cors = require('cors')({origin: true})
const admin = require('firebase-admin')

const storage = admin.storage()

/**
 * Function to retrieve content from storage
 */
const getContent = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        httpMethodRestrictorMiddleware(['GET'])(req, res, async () => {

            const { urlPath }   = req.query                         //Extract the 'urlPath' from the query parameters of the request
            const bucket        = storage.bucket()                  //Initialize a reference to the storage bucket
            const fileRef       = bucket.file(urlPath)              //Create a reference to a file in the bucket using the 'urlPath'
            const [fileContent] = await fileRef.download()          //Download the content of the file and wait for the operation to complete
            const contentText   = fileContent.toString('utf-8')     //Convert the file content from a Buffer to a UTF-8 string

            //Send a response with status 200 ok and the file content in JSON format
            return res.status(200).json({ content: contentText })
        })
    })
})

module.exports = { getContent }