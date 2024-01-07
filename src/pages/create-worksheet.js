import ActivityInstructionsComponent from "@/components/activity-instructions.component";
import FullPageLoading from "@/components/full-page.loading.component";
import Layout from "@/components/layout";
import TagInputComponent from "@/components/tag-input.component";
import ACTIVITY_INSTRUCTIONS from "@/constants/activity-info.constant";
import { useError } from "@/context/error.context";
import { useRouter } from "next/router";
import { useState } from "react";

const GrammarVocabWorksheet = () => {
    const [formData, setFormData] = useState({
        topic: '',
        level: '',
        length: 5
    });
    const [ targetWords, setTargetWords ]       = useState([])
    const [ targetGrammar, setTargetGrammar ]   = useState([])
    const [isLoading, setIsLoading]             = useState(false)

    const router = useRouter();
    const { handleError } = useError();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {

            //Construct request data
            const requestData = {...formData, targetWords: targetWords.map(tW => tW.text), targetGrammar: targetGrammar.map(tG => tG.text)}

            const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_URL}generateGrammarVocabularyWorksheet`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) throw new Error('Failed to generate worksheet');

            const data = await response.json();

            //Store worksheet / Activity ID in local storage
            const storedActivityIds = JSON.parse(localStorage.getItem('activityIds')) || []
            storedActivityIds.push(data.worksheetId)
            localStorage.setItem('activityIds', JSON.stringify(storedActivityIds))

            router.push(`/activity/${data.worksheetId}`);

        } catch (error) {
            console.error(error);
            setIsLoading(false);
            handleError(error);
        }
    };

    return (
        <Layout title={isLoading ? '' : "Create Grammar/Vocabulary Worksheet"}>
            {
                isLoading ? (
                    <FullPageLoading message="Creating Your Worksheet..." />
                ) : (
                    <div className='w-full h-full p-4'>
                    
                        <ActivityInstructionsComponent instructionText={ACTIVITY_INSTRUCTIONS.grammarVocab.instructions} />
                        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
                        <div>
                            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic</label>
                            <input
                                type="text"
                                name="topic"
                                id="topic"
                                value={formData.topic}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                placeholder="e.g., Daily Routines, Travel, Health"
                                required
                                maxLength={50}
                            />
                        </div>

                        <div>
                            <label htmlFor="level" className="block text-sm font-medium text-gray-700">Student Level</label>
                            <select
                                name="level"
                                id="level"
                                value={formData.level}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                required
                            >
                                <option value="">Select a level</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="length" className="block text-sm font-medium text-gray-700">Number of Activities</label>
                            <input
                                type="number"
                                name="length"
                                id="length"
                                value={formData.length}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                placeholder="e.g., 5"
                                min="1"
                                max="50"
                                required
                            />
                        </div>

                        <TagInputComponent 
                            tags={targetWords}
                            setTags={setTargetWords}
                            label="Target Vocabulary"
                            placeholder="Add new word"
                            tagLimit={20}
                        />


                            <TagInputComponent 
                                tags={targetGrammar}
                                setTags={setTargetGrammar}
                                label='Target Grammar Points'
                                placeholder="Add new grammar point"
                                tagLimit={5}
                            />

                            <div className="text-center">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Create Worksheet
                                </button>
                            </div>
                        </form>
                    </div>
                )
            }
        </Layout>
    )
}

export default GrammarVocabWorksheet
