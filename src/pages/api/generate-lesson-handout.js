import OpenAI from "openai"

export default async function handler(req, res) {

    if (req.method === 'POST') {

        //Init openai instance
        const openai = new OpenAI()

        //Get form data
        const { level, lessonPlan } = req.body

        // //Messages
        // const messages = [
        //     { role: "system", content: 'Read the user provided lesson plan. Generate a handout sheet for students complete with all activities to supplement the lesson plan. USE MARKDOWN SYNTAX' },
        //     { role: "user", content: `Here is the lesson plan: ${lessonPlan}` }
        // ]
        const messages = [
            { role: "system", content: `Create a student handout for this lesson. THE PROVIDED PLAN IS FOR THE TEACHER. CREATE THE STUDENT ACTIVITES HANDOUT. USE MARKDOWN. USE SIMPLE, GRADED ENGLISH APPROPRIATE FOR ${level} students` },
            { role: "user", content: `Here is the lesson plan: ${lessonPlan}` },
            {
                role: "system",
                content: `
                
                I will provide some example output here.
                
                Example of a gap-fill activity:
                
                ### Geometry Gap-Fill Activity
                Complete the sentences.
                1. A __________ is a shape with four equal sides.
                2. A triangle with two equal sides is called an __________ triangle.
        
                Example of a simple language presentation handout:
        
                ### Basic Geometry Presentation
                - **Shape Names**: Circle, Square, Triangle
                - **Properties**:
                  - Circle: Round, no corners.
                  - Square: Four equal sides, four corners.
                  - Triangle: Three sides, three corners.

                  Example of a free practice handout:

                ### Renewable Energy Free Practice Activity

                  **Objective**: Apply your understanding of renewable energy sources in a creative project.
          
                  **Task**:
                  Choose one renewable energy source (solar, wind, hydro, etc.). Create a project that demonstrates how this energy source can be used in our community. You can create a model, a presentation, a poster, or write a proposal.
          
                  **Guidelines**:
                  - Include basic information about the chosen energy source.
                  - Explain why it is a good choice for our community.
                  - Be creative! Use drawings, diagrams, or any other materials to support your project.
                  - You can work individually or in groups.
          
                  **Note**: Feel free to use the library, internet, and other resources for research. The goal is to explore and present your ideas innovatively.
                `
            },

        ]
        console.log('messages: ', messages)
        

        //Generate handout
        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "gpt-3.5-turbo"
            
        })

        console.log('COMPLETION CHOICES: ', completion.choices)

        //Get content
        const { content } = completion.choices[0].message

        res.status(200).json({ lessonHandout: content })

    } else {
        // Handle non-POST requests, or add logic to handle other methods if needed
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}