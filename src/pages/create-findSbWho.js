import ActivityInstructionsComponent from "@/components/activity-instructions.component";
import FullPageLoading from "@/components/full-page.loading.component";
import ACTIVITY_INFO from "@/constants/activity-info.constant";
import { useAuth } from "@/context/auth.context";
import ProtectedRoute from "@/hoc/protected-route.hoc";
import { useRouter } from "next/router";
import { useState } from "react";
import apiRequest from "@/services/api-request";
import PageHeaderComponent from "@/components/page-header";
import ButtonPrimaryComponent from "@/components/button/button.primary.component";

/**
 * Page to create 'Find Someone Who...'
 */
const FindSbWho = () => {
    const [ formData, setFormData ] = useState({
        topic: '',
        level: '',
        numberOfItems: 5,
        ageGroup: '',
        objectives: ''
    });
    const [ isLoading, setIsLoading ] = useState(false)

    const router            = useRouter()
    const { getToken }      = useAuth()

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission behaviour
        setIsLoading(true);  // Set loading state true

        // Get user auth token
        const authToken = await getToken()

        // Generate the 'Find Someone Who' activity
        const response = await apiRequest('generateFindSomeoneWhoWorksheet', {
            method: 'POST',
            authToken,
            headers: {'Content-Type': 'application/json'},
            body: formData
        })

        // If response ok
        if (response && response.worksheetId) {

            // Redirect to view page with activity ID
            router.push(`/activity/${response.worksheetId}`)
        } 
        
        // Response not ok
        else {
            setIsLoading(false) // Set loading state false
        }

    };

    return (
        <>
            <PageHeaderComponent text='Create a "Find Someone Who..." Worksheet' />
            {
                isLoading ? (
                    <FullPageLoading message='Creating Your Activity Worksheet...' />
                ) : (
                    <div className='w-full h-full p-4'>
                    
                        <ActivityInstructionsComponent instructionText={ACTIVITY_INFO.findSbWho.instructions} />
                        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
                            <div >
                                <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic</label>
                                <input
                                    type="text"
                                    name="topic"
                                    id="topic"
                                    value={formData.topic}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                    placeholder="e.g., Irregular Verbs, Food Vocabulary, Past Tense"
                                    required
                                    maxLength={50}
                                />
                            </div>

                            <div >
                                <label htmlFor="level" className="block text-sm font-medium text-gray-700" >Student Level</label>
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

                            <div >
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

                            <div >
                                <label htmlFor="numberOfItems" className="block text-sm font-medium text-gray-700">
                                    Number of Prompts
                                </label>
                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                    <input
                                        type="number"
                                        name="numberOfItems"
                                        id="numberOfItems"
                                        value={formData.numberOfItems}
                                        onChange={handleChange}
                                        className="p-2 border border-gray-300 rounded-md shadow-sm"
                                        placeholder="e.g., 5"
                                        min="1"
                                        max="20"
                                        required
                                    />

                                    <button type="button" onClick={() => setFormData({...formData, numberOfItems: 5})}
                                            className="p-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
                                        5 Prompts
                                    </button>
                                    <button type="button" onClick={() => setFormData({...formData, numberOfItems: 10})}
                                            className="p-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
                                        10 Prompts
                                    </button>
                                    <button type="button" onClick={() => setFormData({...formData, numberOfItems: 15})}
                                            className="p-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
                                        15 Prompts
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="objectives" className="block text-sm font-medium text-gray-700">Objectives</label>
                                <textarea
                                    name="objectives"
                                    id="objectives"
                                    value={formData.objectives}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                    placeholder="e.g., Students can practice asking and answering personal questions, Students can use past simple tense in conversation"
                                    required
                                    maxLength={400}
                                />
                            </div>

                            <div className="text-center">
                                <ButtonPrimaryComponent type='submit' >
                                    Create Activity
                                </ButtonPrimaryComponent>

                            </div>
                        </form>
                    </div>
                )
            }
        </>
    )
}

export default ProtectedRoute(FindSbWho)