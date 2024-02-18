const functions = require('firebase-functions')
const { httpMethodRestrictorMiddleware } = require('../../middleware/http-method-restrictor.middleware')
const { rateLimitMiddleware } = require('../../middleware/rate-limit.middleware')
const OpenAI = require('openai')
const cors = require('cors')({ origin: true })
const { v4: uuidv4 } = require('uuid')
const admin = require('firebase-admin')
const authenticateRequestMiddleware = require('../../middleware/authenticate-request.middleware')
const { renderMarkdown } = require('../../utils/custom-marked-renderer')

const storage = admin.storage()

/**
 * Function to generate a findSbWho worksheet
 */
const generateFindSomeoneWhoWorksheet = functions.https.onRequest(async (req, res) => {
    cors(req, res, () => {
        httpMethodRestrictorMiddleware(['POST'])(req, res, () => {
            authenticateRequestMiddleware(req, res, () => {
                rateLimitMiddleware('findSbWho', req, res, async () => {

                    const { uid } = req     // Extract user ID from request

                    //Initialize OpenAI
                    const openai = new OpenAI()
    
                    //Extract inputs
                    const { topic, level, numberOfItems, ageGroup, objectives } = req.body
    
                    // Validate inputs
                    if (typeof topic !== 'string' || topic.length > 50 ||
                        typeof level !== 'string' || level.length > 20 ||
                        typeof numberOfItems !== 'number' || numberOfItems < 1 || numberOfItems > 20 ||
                        typeof ageGroup !== 'string' || ageGroup.length > 20 ||
                        typeof objectives !== 'string' || objectives.length > 200) {
                        res.status(400).send('Invalid input parameters');
                        return;
                    }
    
                    //Initialize messages
                    const messages = [{role: "system", content: "You are a CELTA trained ESL lesson material creation assistant. Generate a 'Find Someone Who' worksheet for an ESL class with the following details:"}]
    
                    //Add user details to messages
                    messages.push({
                        role: "user",
                        content: `
                        - Topic: ${topic}
                        - Level: ${level}
                        - Age Group: ${ageGroup}
                        - Objectives: ${objectives}
                        `
                    })
    
                    //Further content instruction
                    messages.push({
                        role: "system",
                        content: "The activity should focus on free practice to encourage natural language use related to the topic and objectives. DO NOT ASK DIRECT QUESTIONS ABOUT THE TARGET LANGUAGE. USE CELTA PRINCIPLES TO ENCOURAGE NATURAL, COMMUNICATIVE CONVERSATIONS ELICITING INDEPENDENT USE OF THE TARGET LANGUAGE WITHOUT DIRECT PROMPTING."
                    })
    
                    //Formatting instruction
                    messages.push({
                        role: "system",
                        content: `The worksheet should contain ${numberOfItems} items. CREATE A HTML TABLE WITH THESE ITEMS. INCLUDE COLUMN(S) FOR STUDENT RESPONSES. The HTML table should be simple and suitable for embedding in a Markdown document.`
                    })
                    
                    //Get GPT response
                    const completion = await openai.chat.completions.create({
                        messages: messages,
                        model: "gpt-3.5-turbo"
                    })
    
                    const { content }       = completion.choices[0].message                             //Destructure completion message
                    const htmlContent       = renderMarkdown(content) //marked(content)                                           //Content as HTML
                    const uniqueWorksheetId = uuidv4()                                                  //Generate a unique worksheet ID
                    const worksheetPath     = `worksheets/findSomeoneWho/${uniqueWorksheetId}.html`     //Construct worksheet path
                    const contentRef        = storage.bucket().file(worksheetPath)                      //Generate content ref
    
                    //Save generated and formatted HTML table as markdown
                    await contentRef.save(htmlContent, { contentType: 'text/html' })
    
                    //Save metadata to firestore and get doc ref
                    const docRef = await admin.firestore().collection('activities').add({
                        topic, level, ageGroup, numberOfItems, activity: 'findSbWho',
                            worksheetUrl: worksheetPath,
                            uid
                    })
    
                    return res.status(200).json({ worksheetId: docRef.id })
    
                })
            })
        })
    })
})

module.exports = { generateFindSomeoneWhoWorksheet }