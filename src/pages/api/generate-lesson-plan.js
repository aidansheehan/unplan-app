import OpenAI from "openai"
import { v4 as uuidv4 } from 'uuid'
import { storage, db } from '../../../firebaseConfig.js'
import { ref, uploadBytes } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'


export default async function handler(req, res) {
  if (req.method === 'POST') {

    //Initialize OpenAI
    const openai = new OpenAI()

    //Initialize messages
    const messages = [{role: "system", content: 'You are a CELTA trained ESL lesson planning assistant. Create a lesson plan for the user\'s class. USE MARKDOWN'}]

    //Get form data
    const { topic, level, duration, objectives, ageGroup } = req.body;

    //Construct messages object
    messages.push({
        role: "user",
        content: `Topic: ${topic}
        Age Group: ${ageGroup}
        Level: ${level}
        Duration: ${duration} minutes
        Objectives:
        ${objectives}`
    })

    //Get response from GPT
    const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo"
    })

    //Destructure completion for lesson plan content
    const { content } = completion.choices[0].message

    // Generate unique lesson id
    const uniqueLessonId = uuidv4()

    //Create content ref
    const contentRef = ref(storage, `lesson-plans/${uniqueLessonId}.md`)

    //Create a blob of the file
    const contentBlob = new Blob([content], { type: 'text/markdown' })

    //Upload the blob to firebase storage
    await uploadBytes(contentRef, contentBlob)

    //Write metadata to db
    const docRef = await addDoc(collection(db, 'lessons'), {
      topic, level, duration, objectives, ageGroup,
      lessonPlanUrl: `lesson-plans/${uniqueLessonId}.md`
    })

    res.status(200).json({ lessonPlanId: docRef.id, lessonPlan: content })

  } else {
    // Handle non-POST requests, or add logic to handle other methods if needed
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
