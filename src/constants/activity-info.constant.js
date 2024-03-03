import { faBookOpen, faFileAlt, faUsers } from "@fortawesome/free-solid-svg-icons"

/**
 * Map activity keys to texts
 */
const ACTIVITY_INFO = {
    findSbWho: {
        title: '"Find Someone Who..."',
        instructions: `"Find Someone Who" is a classic ESL activity that encourages students to interact and practice 
        their questioning and answering skills in English. In this activity, students are given a 
        worksheet with various statements or prompts. They must move around the classroom and talk 
        to their classmates to find someone who matches each statement. For example, "Find someone 
        who has been to Europe" requires the student to ask their peers about their travel experiences. 
        It's a great way to get students speaking and to learn more about each other!`,
        icon: faUsers
    },
    grammarVocab: {
        title: 'Grammar/Vocabulary Worksheet',
        instructions: `The Grammar/Vocabulary Worksheet is designed to help students practice specific language 
        points in a structured way. This worksheet combines both grammar and vocabulary elements, 
        enabling teachers to tailor the content to their class's needs. The activities will progress 
        from controlled practice, where students focus on accuracy, to free practice, where they 
        can use the language more creatively. This worksheet is great for reinforcing new language 
        points and ensuring students feel confident using them in different contexts.`,
        icon: faFileAlt
    },
    readingComprehension: {
        title: 'Reading Comprehension Worksheet',
        instructions: `The Reading Comprehension Worksheet is designed to enhance students' reading skills in a 
        structured and engaging way. This activity involves a reading passage followed by a series of 
        comprehension questions that range from simple recall to more complex analysis and critical 
        thinking. The worksheet will be tailored to the specified level, length, and objectives, ensuring 
        that it aligns with the students' learning needs. This is an excellent tool for improving reading 
        comprehension and encouraging thoughtful engagement with the text.`,
        icon: faBookOpen
    }

}

export default ACTIVITY_INFO