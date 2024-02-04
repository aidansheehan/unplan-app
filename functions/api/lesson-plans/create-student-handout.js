const functions = require('firebase-functions')
const { httpMethodRestrictorMiddleware } = require('../../middleware/http-method-restrictor.middleware')
const { rateLimitMiddleware } = require('../../middleware/rate-limit.middleware')
const cors = require('cors')({ origin: true })
const OpenAI = require('openai')
const admin = require('firebase-admin')

/**
 * Function to create a student handout
 */
const createStudentHandout = functions.https.onRequest(async (req, res) => {
    cors(req, res, () => {
        httpMethodRestrictorMiddleware(['POST'])(req, res, () => {
            rateLimitMiddleware('createStudentHandout', req, res, async () => {

                try {
                    
                    //Extract inputs
                    const { level, lessonPlan, lessonId, ageGroup } = req.body;

                    // Validate inputs
                    if (typeof level !== 'string' || level.length > 20 || 
                        typeof lessonPlan !== 'string' || lessonPlan.length > 10000 ) {
                            res.status(400).send('Invalid input parameters')
                            return;
                        }

                    //Initialize OpenAI
                    const openai = new OpenAI();

                    //Construct messages
                    const messages = [
                        {
                        role: "system",
                        content: `You are a CELTA trained ESL worksheet helper. Identify any parts of the users lesson plan you can provide VISUAL HTML content for and create it for them. The content is for PRINTING. DO NOT include interactive features.`
                        },
                        {
                        role: "user",
                        content: `Here is my lesson plan: ${lessonPlan}. Help me, make a handout for the students for this class!`
                        },
                        {
                        role: "system",
                        content: `Create a STUDENT handout for the provided lesson plan. Provide activities as mentioned in the plan. Use SIMPLE, graded english appropriate for ${level} learners - do not use any vocabulary or grammar that will confuse them. Provide activities appropraite for ${ageGroup} students. Build context slowly. Keep your content aligned with the activities mentioned in the lesson plan.`
                        },
                        {
                        role: "system",
                        content: 'Your output is RAW HTML. It will be inserted into an existing HTML document, do not provide boilerplate, or comments to assign html. Your response should start with `<div>`. Leave space for student answers. Activities should require student involvement, for example in a matching activity the pictures and words should be incorrectly ordered so the STUDENT CAN FIX THAT. MINIMISE YOUR LANGUAGE USE. Give only simple instructions. Any images need to have ids representing their order eg "#image-1", "#image-2" etc and have DESCRIPTIVE `alt` tags that can be used as DALE prompts.'
                        }
                    ]

                    //Get OpenAI response
                    const completion = await openai.chat.completions.create({
                        messages: messages,
                        model: "gpt-3.5-turbo"
                    });

                    const { content } = completion.choices[0].message;  //Destructure OpenAI Response

                    const handoutPath = `lessons/${lessonId}/handout.html`  //New storage path

                    //Save to Firebase Storage
                    const storageRef = admin.storage().bucket();
                    const handoutRef = storageRef.file(handoutPath)
                    await handoutRef.save(content, { contentType: 'text/html' });

                    //Update Firebase document
                    const lessonDocRef = admin.firestore().doc(`lessons/${lessonId}`);
                    await lessonDocRef.update({
                        'contentRef.handout': handoutPath //Storing relative path
                    })

                    res.status(200).json({ lessonId, lessonHandout: content });

                } catch (error) {
                    console.error("Error in createStudentHandout function:", error.message);
                    res.status(500).send(`Internal Server Error: ${error.message}`);
                }
            })
        })
    })
})

module.exports = { createStudentHandout }