// pages/api/generate-lesson-plan.js
// import { Configuration, OpenAIApi } from "openai";
import OpenAI from "openai";


export default async function handler(req, res) {
  if (req.method === 'POST') {
    // // Your OpenAI API key should be stored securely, e.g., in environment variables
    // const configuration = new Configuration({
    //   apiKey: process.env.OPENAI_API_KEY,
    // });
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

    console.log(completion.choices)

    console.log('completion: ', completion.choices[0].message.content)

    res.status(200).json({ lessonPlan: completion.choices[0].message.content })
    // const openai = new OpenAI({
    //     api_key: process.env.OPENAI_API_KEY
    // });

    // Construct the prompt using the form data
    // const { topic, level, duration, objectives } = req.body;
//     const prompt = `Create a detailed lesson plan for an ESL class:
// Topic: ${topic}
// Level: ${level}
// Duration: ${duration} minutes
// Objectives:
// ${objectives}`;

//     try {
//       // Make the call to OpenAI's API using the GPT-3.5 turbo model
//       const response = await openai.createCompletion({
//         model: "gpt-3.5-turbo", // This specifies the GPT-3.5 turbo model
//         prompt: prompt,
//         max_tokens: 1024,
//         temperature: 0.7, // Adjust as necessary for creativity
//         // Add any other parameters you need for your application
//       });

//       // Send back the response from OpenAI's API
//       res.status(200).json({ lessonPlan: response.data.choices[0].text });
//     } catch (error) {
//       // Handle errors appropriately in your actual application
//       console.error('Error calling OpenAI:', error);
//       res.status(500).json({ error: 'Error generating lesson plan' });
//     }
  } else {
    // Handle non-POST requests, or add logic to handle other methods if needed
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
