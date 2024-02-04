const functions = require('firebase-functions')
const OpenAI = require('openai')
const admin = require('firebase-admin')
const { marked } = require('marked')
const { FieldValue } = require('@google-cloud/firestore')

const db = admin.firestore()
const storage = admin.storage()


const generateLessonPlan = functions.runWith({ timeoutSeconds: 300 }).firestore
.document('lessons/{docId}')
.onCreate(async (snap, context) => {

  const docId       = context.params.docId  //Get the docId
  const newDocument = snap.data()           //Get the newly created document

  //Destructure newDocument
  const { topic, level, duration, objectives, ageGroup, isOneToOne, isOnline } = newDocument

  try {

    const openai = new OpenAI() //Init openAI

    //Init messages
    const messages = [{ role: "system", content: 'You are a CELTA trained ESL lesson planning assistant. Create a lesson plan for the user\'s class. USE MARKDOWN' }]

    //Push user data
    messages.push({
      role: "user",
      content: `Topic: ${topic}
      Age Group: ${ageGroup}
      Level: ${level}
      Duration: ${duration} minutes
      Objectives:
      ${objectives}`
    });

    //Add oneToOne message
    if (isOneToOne) {
      messages.push({
        role: 'user',
        content: 'The class is a ONE TO ONE class, with a single student'
      })
    }

    //Online class
    if (isOnline) {
      messages.push({
        role: 'user',
        content: 'The class is an ONLINE class, to be conducted over video chat.'
      })
    }

    //Get openAI completion
    const stream = await openai.chat.completions.create({
          messages: messages,
          model: "gpt-4-1106-preview",
          stream: true
    });

    let content         = ''    //Initialize lesson plan content
    let chunkCounter    = 0     //Initialize chunkCounter

    for await (const chunk of stream) {

      const chunkContent = chunk.choices[0]?.delta.content  //New chunk content

      //If chunkContent not undefined (sent at end of completion)
      if (chunkContent !== undefined) {

        content += chunkContent         //Add chunk content to lesson plan
        chunkCounter++                  //Increment chunk counter

        // If chunkLimit reached
        if (chunkCounter >= 3) {
            //Update firestore with current content
            await db.collection('lessons').doc(docId)
              .update({ temporaryLessonPlan: marked(content) });
          
            chunkCounter = 0; //Reset counter after update
        }

      }
    }

    //Update any remaining content after the loop
    if (chunkCounter > 0) {
      await db.collection('lessons').doc(docId)
        .update({ temporaryLessonPlan: marked(content) })
    }

    //Convert markdown output to HTML
    const htmlContent = marked(content)

    //Save to firebase storage
    const lessonPlanPath = `lessons/${docId}/plan.html`
    const lessonPlanRef   = storage.bucket().file(lessonPlanPath)
    await lessonPlanRef.save(htmlContent, { contentType: 'text/html' })

    //Update the firestore document
    await db.collection('lessons').doc(docId).update({
      'contentRef.plan': lessonPlanPath,
      'status': 'complete'
    })

    //Delete temporary lesson plan from Firestore and update status
    await db.collection('lessons').doc(docId)
      .update({ temporaryLessonPlan: FieldValue.delete() })


  } catch (error) {
    console.error('Error while generating lesson plan: ', error)

    //Update firestore document in case of failure
    await db.collection('lessons').doc(docId).update({
      'status': 'failed'
    })
  }


})

module.exports = { generateLessonPlan }