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
              typeof duration !== 'number' ||
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
