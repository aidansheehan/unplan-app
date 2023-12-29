import OpenAI from "openai";

import { storage, db } from '../../../firebaseConfig.js'
import { ref, uploadBytes } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'


export default async function handler(req, res) {
  if (req.method === 'POST') {

    //Test firestore TODO remove
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      })
      console.log("Document written with ID: ", docRef.id)
    } catch (err) {console.log(err)}

    const openai = new OpenAI()

    //Initialize messages
    const messages = [{role: "system", content: 'You are a CELTA trained ESL lesson planning assistant. Create a lesson plan for the user\'s class. USE MARKDOWN'}]

    //Get form data
    const { topic, level, duration, objectives } = req.body;

    messages.push({
        role: "user",
        content: `Topic: ${topic}
        Level: ${level}
        Duration: ${duration} minutes
        Objectives:
        ${objectives}`
    })

    const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo"
    })

    //Destructure completion for lesson plan content
    const { content } = completion.choices[0].message
  
    const contentRef = ref(storage, 'test/lesson-plan-2.md')    //Content ref

    //Create a blob of the file
    const contentBlob = new Blob([content], { type: 'text/markdown' })

    //Upload the blob to firebase storage
    uploadBytes(contentRef, contentBlob).then((snapshot) => {
      console.log('Uploaded a blob or file!')
    }).catch(err => console.log('error: ', err))



    res.status(200).json({ lessonPlan: completion.choices[0].message.content })

  } else {
    // Handle non-POST requests, or add logic to handle other methods if needed
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
