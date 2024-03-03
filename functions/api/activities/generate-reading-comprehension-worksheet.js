const functions = require('firebase-functions')
const { httpMethodRestrictorMiddleware } = require('../../middleware/http-method-restrictor.middleware')
const { rateLimitMiddleware } = require('../../middleware/rate-limit.middleware')
const cors = require('cors')({origin: true})
const OpenAI = require('openai')
const { v4: uuidv4 } = require('uuid')
const admin = require('firebase-admin')
const authenticateRequestMiddleware = require('../../middleware/authenticate-request.middleware')
const { renderMarkdown } = require('../../utils/custom-marked-renderer')
const { FieldValue } = require('firebase-admin/firestore')

const storage = admin.storage()

/**
 * Function to generate a reading comprehension worksheet
 */
const generateReadingComprehensionWorksheet = functions.https.onRequest(async (req, res) => {
    cors(req, res, () => {
        httpMethodRestrictorMiddleware(['POST'])(req, res, () => {
            authenticateRequestMiddleware(req, res, () => {
                rateLimitMiddleware('readingComp', req, res, async () => {

                    const { uid } = req     // Extract user ID from request

                    //Initialize OpenAI
                    const openai = new OpenAI()
    
                    // Extract inputs
                    const { textComplexityLevel, textLength, topicGenre, numberOfActivities/*, activityTypes*/, learningObjectives, ageGroup, timeAllocation } = req.body;
    
                    // Validate inputs
                    if (typeof textComplexityLevel !== 'string' || !['beginner', 'intermediate', 'advanced'].includes(textComplexityLevel)) {
                        return res.status(400).send('Invalid Text Complexity Level');
                    }
                    if (typeof textLength !== 'string' || !['short', 'medium', 'long'].includes(textLength)) {
                        return res.status(400).send('Invalid Text Length');
                    }
                    if (typeof topicGenre !== 'string' || topicGenre.length === 0 || topicGenre.length > 100) {
                        return res.status(400).send('Invalid Topic/Genre');
                    }
                    if (typeof numberOfActivities !== 'number' || numberOfActivities < 1 || numberOfActivities > 20) {
                        return res.status(400).send('Invalid Number of Activities');
                    }
                    if (typeof learningObjectives !== 'string' || learningObjectives.length === 0 || learningObjectives.length > 200) {
                        return res.status(400).send('Invalid Learning Objectives');
                    }
                    if (typeof ageGroup !== 'string' || !['kids', 'teens', 'adults'].includes(ageGroup)) {
                        return res.status(400).send('Invalid Age Group');
                    }
                    if (typeof timeAllocation !== 'number' || timeAllocation < 10 || timeAllocation > 120) {
                        return res.status(400).send('Invalid Time Allocation');
                    }
    
                    // Initialize messages for OpenAI
                    const messages = [{ role: "system", content: "You are a CELTA trained ESL lesson material creation assistant. Generate a reading comprehension task with the following details:" }];
                //- Activity Types: ${activityTypes.join(", ")}
                    // Add user details to messages
                    messages.push({
                        role: "user",
                        content: `
                        - Text Complexity Level: ${textComplexityLevel}
                        - Text Length: ${textLength}
                        - Topic/Genre: ${topicGenre}
                        - Number of Activities: ${numberOfActivities}
                        
                        - Learning Objectives: ${learningObjectives}
                        - Age Group: ${ageGroup}
                        - Time Allocation: ${timeAllocation} minutes
                        `
                    });
    
                    // Further content instruction
                    messages.push({
                        role: "system",
                        content: "Create a reading text and activities that are suitable for the specified level and objectives. The activities should range from pre-reading tasks to post-reading tasks, including skimming, scanning, detailed comprehension, inferential and critical thinking tasks, and summarizing. USE MARKDOWN."
                    });
    
                    // Get GPT response
                    const completion = await openai.chat.completions.create({
                        messages: messages,
                        model: "gpt-3.5-turbo"
                    });
    
                    const { content } = completion.choices[0].message   //Destructure GPT content
                    const htmlContent = renderMarkdown(content)         //Format content as HTML
    
                    // Generate a unique worksheet ID
                    const uniqueWorksheetId = uuidv4();
    
                    //Construct worksheet path
                    const worksheetPath = `worksheets/readingComprehension/${uniqueWorksheetId}.html`
    
                    // Generate content ref
                    const contentRef = storage.bucket().file(worksheetPath);
    
                    // Save generated content as markdown
                    await contentRef.save(htmlContent, { contentType: 'text/html' });

                    // Get current timestamp
                    const timestamp = FieldValue.serverTimestamp()
    
                    // Save metadata to firestore and get doc ref
                    const docRef = await admin.firestore().collection('activities').add({
                        textComplexityLevel, textLength, topic: topicGenre, numberOfActivities, /*activityTypes,*/ learningObjectives, ageGroup, timeAllocation, activity: 'readingComprehension',
                        worksheetUrl: worksheetPath,
                        uid,
                        createdAt: timestamp,
                        updatedAt: timestamp
                    });
    
                    res.status(200).json({ worksheetId: docRef.id })
    
                })
            })
        })
    })
})

module.exports = { generateReadingComprehensionWorksheet }