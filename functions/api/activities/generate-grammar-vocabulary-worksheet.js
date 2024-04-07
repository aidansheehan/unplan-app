const functions = require('firebase-functions')
const { httpMethodRestrictorMiddleware } = require('../../middleware/http-method-restrictor.middleware')
const { rateLimitMiddleware } = require('../../middleware/rate-limit.middleware')
const cors = require('cors')({ origin: true })
const OpenAI = require('openai')
const { v4: uuidv4 } = require('uuid')
const admin = require('firebase-admin')
const authenticateRequestMiddleware = require('../../middleware/authenticate-request.middleware')
const { renderMarkdown } = require('../../utils/custom-marked-renderer')
const { FieldValue } = require('firebase-admin/firestore')

const storage = admin.storage()

/**
 * Function to generate a grammar / vocabulary worksheet
 */
const generateGrammarVocabularyWorksheet = functions.https.onRequest(async (req, res) => {
    cors(req, res, () => {
        httpMethodRestrictorMiddleware(['POST'])(req, res, () => {
            authenticateRequestMiddleware(req, res, () => {
                rateLimitMiddleware('gramVocab', req, res, async () => {

                    const { uid } = req.user // Extract user ID from request

                    //Init OpenAI
                    const openai = new OpenAI()
    
                    //Extract inputs
                    const { topic, level, length, targetWords, targetGrammar } = req.body
    
                    // Validate inputs
                    if (typeof topic !== 'string' || topic.length > 50 ||
                        typeof level !== 'string' || level.length > 20 ||
                        typeof length !== 'number' || length < 1 || length > 50 ||
                        (targetWords && (!Array.isArray(targetWords) || targetWords.some(word => typeof word !== 'string'))) || targetWords.length > 20 ||
                        (targetGrammar && (!Array.isArray(targetGrammar) || targetGrammar.some(grammar => typeof grammar !== 'string'))) || targetGrammar.length > 5 ) {
                        res.status(400).send('Invalid input parameters');
                        return;
                    }
    
                    // Construct messages
                    const messages = [{
                        role: "system",
                        content: `Generate a grammar/vocabulary worksheet. The worksheet is for an ESL class about '${topic}', aimed at students at the ${level} level. It should include activities focusing on '${targetWords ? targetWords.join(", ") : ''}' and '${targetGrammar ? targetGrammar.join(", ") : ''}', progressing from controlled to free practice. The worksheet should contain ${length} activities. USE MARKDOWN. LEAVE SPACE FOR STUDENT ANSWERS.`
                    }];
                    
                    // Get GPT response
                    const completion = await openai.chat.completions.create({
                        messages: messages,
                        model: "gpt-3.5-turbo"
                    });
    
                    const { content } = completion.choices[0].message   //Destructure completion
                    const htmlContent = renderMarkdown(content)         //Format content as html
    
                    //Generate a unique worksheet ID
                    const uniqueWorksheetId = uuidv4()
    
                    //Construct worksheet path
                    const worksheetPath = `worksheets/grammarVocabulary/${uniqueWorksheetId}.html`
    
                    // Generate content ref
                    const contentRef = storage.bucket().file(worksheetPath)
    
                    // Save generated Markdown content
                    await contentRef.save(htmlContent, { contentType: 'text/html' })

                    // Get current timestamp
                    const timestamp = FieldValue.serverTimestamp()
    
                    // Save metadata to firestore and get doc ref
                    const docRef = await admin.firestore().collection('activities').add({
                        topic, level, length, targetWords, targetGrammar, activity: 'grammarVocab',
                        worksheetUrl: worksheetPath,
                        uid,
                        createdAt: timestamp,
                        updatedAt: timestamp
                    })
    
                    return res.status(200).json({ worksheetId: docRef.id })
    
                })
            })
        })
    })
})

module.exports = { generateGrammarVocabularyWorksheet }