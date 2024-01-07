const functions = require("firebase-functions");
const admin = require("firebase-admin");
const OpenAI = require("openai");
const { v4: uuidv4 } = require('uuid');
const { FirebaseFunctionsRateLimiter } = require("firebase-functions-rate-limiter")
const nodemailer = require("nodemailer")
const cors = require("cors")({ origin: true });

admin.initializeApp();
const db = admin.firestore();
const storage = admin.storage();

//Create a transporter using Brevo SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.BREVO_SMTP_KEY
  }
})

/**
 * Function to send an email to myself if rate limit exceeded
 */
const sendRateLimitEmail = async (processName) => {

  //Get current timestamp
  const now = new Date()

  // Format the date and time
  const formattedTimestamp = now.getFullYear() + '-' +
  String(now.getMonth() + 1).padStart(2, '0') + '-' + // Months are zero-indexed
  String(now.getDate()).padStart(2, '0') + ' ' +
  String(now.getHours()).padStart(2, '0') + ':' +
  String(now.getMinutes()).padStart(2, '0') + ':' +
  String(now.getSeconds()).padStart(2, '0')

  //Configure mail options
  const mailOptions = {
    from: `"RATE LIMITER" <${process.env.MY_EMAIL}>`,
    to: process.env.MY_EMAIL,
    subject: 'RATE LIMIT EXCEEDED [EASY PLAN ESL]',
    text: `Rate limit for ${processName} exceeded at ${formattedTimestamp}`
  }

  //Send email
  await transporter.sendMail(mailOptions)
}

/**
 * Generate lesson plan rate limiter
 */
const gLPLimiter = FirebaseFunctionsRateLimiter.withFirestoreBackend({
  name: 'generate_lesson_plan_rate_limiter',
  periodSeconds: 86400,
  maxCalls: 1000,
}, db)

exports.generateLessonPlan = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method === 'POST') {

      //Check if rate limiter exceeded
      const isLimited = await gLPLimiter.isQuotaExceededOrRecordUsage()

      //If rate limit exceeded
      if (isLimited) {
        
        //Send warning email
        await sendRateLimitEmail('generateLessonPlan')

        //Return error
        res.status(429).send('Too many requests, please try again later')
        return
      }

      const openai = new OpenAI();
      const messages = [{ role: "system", content: 'You are a CELTA trained ESL lesson planning assistant. Create a lesson plan for the user\'s class. USE MARKDOWN' }];

      //Extract inputs
      const { topic, level, duration, objectives, ageGroup } = req.body;

      // Validate inputs
      if (typeof topic !== 'string' || topic.length > 50 ||
            typeof level !== 'string' || level.length > 20 ||
                typeof objectives !== 'string' || objectives.length > 400 ||
                  typeof ageGroup !== 'string' || ageGroup.length > 20) {
          res.status(400).send('Invalid input parameters');
          return;
      }

      messages.push({
        role: "user",
        content: `Topic: ${topic}
        Age Group: ${ageGroup}
        Level: ${level}
        Duration: ${duration} minutes
        Objectives:
        ${objectives}`
      });

      const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo"
      });

      const { content } = completion.choices[0].message;
      const uniqueLessonId = uuidv4();
      const contentRef = storage.bucket().file(`lesson-plans/${uniqueLessonId}.md`);
      await contentRef.save(content, { contentType: 'text/markdown' });

      const docRef = await db.collection('lessons').add({
        topic, level, duration, objectives, ageGroup,
        lessonPlanUrl: `lesson-plans/${uniqueLessonId}.md`
      });

      res.status(200).json({ lessonPlanId: docRef.id, lessonPlan: content });
    } else {
      res.status(405).send(`Method ${req.method} Not Allowed`);
    }
  });
});

/**
 * createStudentHandout rate limiter
 */
const cSHLimiter = FirebaseFunctionsRateLimiter.withFirestoreBackend({
  name: 'create_student_handout_rate_limiter',
  periodSeconds: 86400,
  maxCalls: 1000
}, db)

exports.createStudentHandout = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {

    try {

      if (req.method !== 'POST') {
        throw new Error(`Method ${req.method} Not Allowed`);
      }

      //Check if rate limiter exceeded
      const isLimited = await cSHLimiter.isQuotaExceededOrRecordUsage()

      //If rate limit exceeded
      if (isLimited) {

        //Send warning email
        await sendRateLimitEmail('createStudentHandout')

        //Return error
        res.status(429).send('Too many requests, please try again later')
        return
      }

      //Extract inputs
      const { level, lessonPlan, lessonPlanId } = req.body;

      // Validate inputs
      if (typeof level !== 'string' || level.length > 20 || 
          typeof lessonPlan !== 'string' || lessonPlan.length > 10000 ) {
            res.status(400).send('Invalid input parameters')
            return;
          }

      const openai = new OpenAI();

      const messages = [
        { role: "system", content: `Create a student handout for this lesson. THE PROVIDED PLAN IS FOR THE TEACHER. CREATE THE STUDENT ACTIVITIES HANDOUT. USE MARKDOWN. USE SIMPLE, GRADED ENGLISH APPROPRIATE FOR ${level} students` },
        { role: "user", content: `Here is the lesson plan: ${lessonPlan}` },
        // Include the example output as provided in your original code
      ];

      const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo"
      });

      const { content } = completion.choices[0].message;
      const storageRef = admin.storage().bucket();
      const handoutRef = storageRef.file(`lesson-handouts/${lessonPlanId}.md`);

      await handoutRef.save(content, { contentType: 'text/markdown' });

      const lessonDocRef = admin.firestore().doc(`lessons/${lessonPlanId}`);
      await lessonDocRef.update({ handoutUrl: `lesson-handouts/${lessonPlanId}.md` });

      res.status(200).json({ lessonId: lessonPlanId, lessonHandout: content });
    // } else {
    //   res.status(405).send(`Method ${req.method} Not Allowed`);
    }catch (error) {
        console.error("Error in createStudentHandout function:", error.message);
        res.status(500).send(`Internal Server Error: ${error.message}`);
  } 
  }
  
  );
});

/**
 * FindSbWho rate limiter
 */
const fSbWhoLimiter = FirebaseFunctionsRateLimiter.withFirestoreBackend({
  name: 'find_sb_who_rate_limiter',
  periodSeconds: 86400,
  maxCalls: 1000
}, db)
exports.generateFindSomeoneWhoWorksheet = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method === 'POST') {

      //Check if rate limiter exceeded
      const isLimited = await fSbWhoLimiter.isQuotaExceededOrRecordUsage()

      //If rate limit exceeded
      if (isLimited) {

        //Send warning email
        await sendRateLimitEmail('findSbWhoWorksheet')

        //Return error
        res.status(429).send('Too many requests, please try again later')
        return
      }

      const openai = new OpenAI();

      // Extract inputs
      const { topic, level, numberOfItems, ageGroup, objectives } = req.body;

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
      });

      const { content } = completion.choices[0].message;

      //Generate a unique worksheet ID
      const uniqueWorksheetId = uuidv4();

      //Generate content ref
      const contentRef = storage.bucket().file(`worksheets/findSomeoneWho/${uniqueWorksheetId}.md`);

      //Save generated and formatted HTML table as markdown
      await contentRef.save(content, { contentType: 'text/markdown' });

      //Save metadata to firestore and get doc ref
      const docRef = await admin.firestore().collection('activities').add({
        topic, level, ageGroup, numberOfItems, activity: 'findSbWho',
        worksheetUrl: `worksheets/findSomeoneWho/${uniqueWorksheetId}.md`
      });

      res.status(200).json({ worksheetId: docRef.id });
    } else {
      res.status(405).send(`Method ${req.method} Not Allowed`);
    }
  });
});

/**
 * gramVocab rate limiter
 */
const gramVocabLimiter = FirebaseFunctionsRateLimiter.withFirestoreBackend({
  name: 'gram_vocab_rate_limiter',
  periodSeconds: 86400,
  maxCalls: 1000
}, db)

exports.generateGrammarVocabularyWorksheet = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method === 'POST') {

      //Check if rate limiter exceeded
      const isLimited = await gramVocabLimiter.isQuotaExceededOrRecordUsage()

      //If rate limit exceeded
      if (isLimited) {

        //Send warning email
        await sendRateLimitEmail('grammarVocabWorksheet')

        //Return error
        res.status(429).send('Too many requests, please try again later')
        return
      }

      const openai = new OpenAI();

      // Extract inputs
      const { topic, level, length, targetWords, targetGrammar } = req.body;

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

      const { content } = completion.choices[0].message;

      // Generate a unique worksheet ID
      const uniqueWorksheetId = uuidv4();

      // Generate content ref
      const contentRef = storage.bucket().file(`worksheets/grammarVocabulary/${uniqueWorksheetId}.md`);

      // Save generated Markdown content
      await contentRef.save(content, { contentType: 'text/markdown' });

      // Save metadata to firestore and get doc ref
      const docRef = await admin.firestore().collection('activities').add({
        topic, level, length, targetWords, targetGrammar, activity: 'grammarVocab',
        worksheetUrl: `worksheets/grammarVocabulary/${uniqueWorksheetId}.md`
      });

      res.status(200).json({ worksheetId: docRef.id });
    } else {
      res.status(405).send(`Method ${req.method} Not Allowed`);
    }
  });
});

/**
 * readingComp rate limiter
 */
const readingCompRateLimiter = FirebaseFunctionsRateLimiter.withFirestoreBackend({
  name: 'reading_comp_rate_limiter',
  periodSeconds: 86400,
  maxCalls: 1000
}, db)

exports.generateReadingComprehensionWorksheet = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method === 'POST') {

      //Check if rate limiter exceeded
      const isLimited = await readingCompRateLimiter.isQuotaExceededOrRecordUsage()

      //If rate limit exceeded
      if (isLimited) {

        //Send warning email
        await sendRateLimitEmail('readingComp')

        //Return error
        res.status(429).send('Too many requests, please try again later')
        return
      }

      const openai = new OpenAI();

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

      const { content } = completion.choices[0].message;

      // Generate a unique worksheet ID
      const uniqueWorksheetId = uuidv4();

      // Generate content ref
      const contentRef = storage.bucket().file(`worksheets/readingComprehension/${uniqueWorksheetId}.md`);

      // Save generated content as markdown
      await contentRef.save(content, { contentType: 'text/markdown' });

      // Save metadata to firestore and get doc ref
      const docRef = await admin.firestore().collection('activities').add({
        textComplexityLevel, textLength, topic: topicGenre, numberOfActivities, /*activityTypes,*/ learningObjectives, ageGroup, timeAllocation, activity: 'readingComprehension',
        worksheetUrl: `worksheets/readingComprehension/${uniqueWorksheetId}.md`
      });

      res.status(200).json({ worksheetId: docRef.id });
    } else {
      res.status(405).send(`Method ${req.method} Not Allowed`);
    }
  });
});
