import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import FullPageLoading from "@/components/full-page.loading.component";
import ActivityInstructionsComponent from "@/components/activity-instructions.component";
import ACTIVITY_INFO from "@/constants/activity-info.constant";
import ProtectedRoute from "@/hoc/protected-route.hoc";
import { useAuth } from "@/context/auth.context";
import apiRequest from "@/services/api-request";

const ReadingComprehension = () => {
    const [formData, setFormData] = useState({
        textComplexityLevel: '',
        textLength: '',
        topicGenre: '',
        numberOfActivities: 5,
        learningObjectives: '',
        ageGroup: '',
        timeAllocation: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const router            = useRouter()
    const { getToken }      = useAuth()

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const authToken = await getToken()

        // Generate the Reading Task
        const response = await apiRequest('generateReadingComprehensionWorksheet', {
            method: 'POST',
            authToken,
            headers: { 'Content-Type': 'application/json' },
            body: { ...formData, numberOfActivities: +formData.numberOfActivities, timeAllocation: +formData.timeAllocation }
        })

        // If response ok
        if (response && response.worksheetId) {
            router.push(`/activity/${response.worksheetId}`)
        }

        // Response not ok
        else {
            setIsLoading(false)
        }

    };

    return (
        <Layout title={isLoading ? '' : "Create Reading Comprehension Worksheet"}>
            {isLoading ? <FullPageLoading message='Creating Your Reading Comprehension Task...' /> : (
                <div className='w-full h-full p-4'>
                    <ActivityInstructionsComponent instructionText={ACTIVITY_INFO.readingComprehension.instructions} />
                    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
                        {/* Text Complexity Level */}
                        <div>
                            <label htmlFor="textComplexityLevel" className="block text-sm font-medium text-gray-700">Text Complexity Level</label>
                            <select
                                name="textComplexityLevel"
                                id="textComplexityLevel"
                                value={formData.textComplexityLevel}
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

                        {/* Text Length */}
                        <div>
                            <label htmlFor="textLength" className="block text-sm font-medium text-gray-700">Text Length</label>
                            <select
                                name="textLength"
                                id="textLength"
                                value={formData.textLength}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                required
                            >
                                <option value="">Select length</option>
                                <option value="short">Short</option>
                                <option value="medium">Medium</option>
                                <option value="long">Long</option>
                            </select>
                        </div>

                        {/* Topic/Genre */}
                        <div>
                            <label htmlFor="topicGenre" className="block text-sm font-medium text-gray-700">Topic/Genre</label>
                            <input
                                type="text"
                                name="topicGenre"
                                id="topicGenre"
                                value={formData.topicGenre}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                placeholder="e.g., Science, History, Fiction"
                                required
                            />
                        </div>

                        {/* Number of Activities */}
                        <div>
                            <label htmlFor="numberOfActivities" className="block text-sm font-medium text-gray-700">Number of Activities</label>
                            <input
                                type="number"
                                name="numberOfActivities"
                                id="numberOfActivities"
                                value={formData.numberOfActivities}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                min="1"
                                max="20"
                                required
                            />
                        </div>

                        {/* Learning Objectives */}
                        <div>
                            <label htmlFor="learningObjectives" className="block text-sm font-medium text-gray-700">Learning Objectives</label>
                            <textarea
                                name="learningObjectives"
                                id="learningObjectives"
                                value={formData.learningObjectives}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                placeholder="e.g., Improve vocabulary, Enhance critical thinking"
                                required
                            />
                        </div>

                        {/* Age Group */}
                        <div>
                            <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-700">Student Age Group</label>
                            <select
                                name="ageGroup"
                                id="ageGroup"
                                value={formData.ageGroup}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                required
                            >
                                <option value="">Select an Age Group</option>
                                <option value="kids">Kids</option>
                                <option value="teens">Teens</option>
                                <option value="adults">Adults</option>
                            </select>
                        </div>

                        {/* Time Allocation */}
                        <div>
                            <label htmlFor="timeAllocation" className="block text-sm font-medium text-gray-700">Time Allocation (minutes)</label>
                            <input
                                type="number"
                                name="timeAllocation"
                                id="timeAllocation"
                                value={formData.timeAllocation}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                placeholder="e.g., 30"
                                min="10"
                                max="120"
                            />
                        </div>

                        <div className="text-center">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Create Activity
                            </button>
                        </div>
                        
                    </form>
                </div>
            )}
        </Layout>
    );
};

export default ProtectedRoute(ReadingComprehension);
