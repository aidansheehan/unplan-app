const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const OpenAI = require("openai");
const { v4: uuidv4 } = require('uuid');

admin.initializeApp();
const db = admin.firestore();
const storage = admin.storage();

exports.generateLessonPlan = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method === 'POST') {
      const openai = new OpenAI();
      const messages = [{ role: "system", content: 'You are a CELTA trained ESL lesson planning assistant. Create a lesson plan for the user\'s class. USE MARKDOWN' }];

      const { topic, level, duration, objectives, ageGroup } = req.body;

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

exports.createStudentHandout = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    // if (req.method === 'POST')
    try {

        console.log("Received request:", {
            method: req.method,
            headers: req.headers,
            origin: req.headers.origin
          });

          if (req.method !== 'POST') {
            throw new Error(`Method ${req.method} Not Allowed`);
          }

      const openai = new OpenAI();
      const { level, lessonPlan, lessonPlanId } = req.body;

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
