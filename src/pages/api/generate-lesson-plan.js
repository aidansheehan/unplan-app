import OpenAI from "openai";


export default async function handler(req, res) {
  if (req.method === 'POST') {

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

  } else {
    // Handle non-POST requests, or add logic to handle other methods if needed
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
