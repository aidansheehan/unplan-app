import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import FullPageLoading from '@/components/full-page.loading.component';

/**
 * Page to plan a lesson
 */
const Plan = () => {

    const [ formData, setFormData ] = useState({ topic: '', level: '', duration: 60, objectives: '', ageGroup: 'Adults' })
    const [ isLoading, setIsLoading ] = useState(false)

    const router = useRouter()

    //Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    //Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()  //Prevent default form submission behaviour
        setIsLoading(true)  //Set loading state true

        try {
            //Generate lesson plan
            const lessonResponse = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_URL}generateLessonPlan`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (!lessonResponse.ok) throw new Error('Failed to generate lesson plan')

            const lessonData = await lessonResponse.json()

            //Generate lesson materials

            try {
                const handoutResponse = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_URL}createStudentHandout`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ level: formData.level, lessonPlan: lessonData.lessonPlan, lessonPlanId: lessonData.lessonPlanId })
                })
    
                if (!handoutResponse.ok) {
                    const errorText = await handoutResponse.text();
                    throw new Error(`Failed to generate lesson materials: ${errorText}`);
                  }
                
                const handoutData = await handoutResponse.json()
    
                //Store lesson ID in local storage
                const storedLessonIds = JSON.parse(localStorage.getItem('lessonIds')) || []
                storedLessonIds.push(handoutData.lessonId)
                localStorage.setItem('lessonIds', JSON.stringify(storedLessonIds))
    
                //Redirect to view page with lesson ID
                router.push(`/view-lesson/${handoutData.lessonId}`)
            } catch (err) {
                console.error("Error calling createStudentHandout:", err.message);
            }

            
        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }

    }

    return (
    <Layout title={isLoading ? '' : 'Create Your Lesson Plan'}>
        {
            isLoading ? (
                <FullPageLoading />
            ) : (
                <div className='w-full h-full p-4'>
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
                            placeholder="e.g., Irregular Verbs, Food Vocabulary, Past Tense"
                            required
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
                            <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-700">Student Age Group</label>
                            <select
                                name="ageGroup"
                                id="ageGroup"
                                value={formData.ageGroup} // Set 'adults' as default value
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                required
                            >
                                <option value="kindergarten">Kindergarten</option>
                                <option value="kids">Kids</option>
                                <option value="teens">Teens</option>
                                <option value="adults">Adults</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                                Duration (minutes)
                            </label>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                                <input
                                type="number"
                                name="duration"
                                id="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded-md shadow-sm"
                                placeholder="e.g., 60"
                                min="5"
                                step="5"
                                required
                                />

                                <button type="button" onClick={() => setFormData({...formData, duration: 60})}
                                        className="p-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
                                60 min
                                </button>
                                <button type="button" onClick={() => setFormData({...formData, duration: 90})}
                                        className="p-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
                                90 min
                                </button>
                                <button type="button" onClick={() => setFormData({...formData, duration: 120})}
                                        className="p-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
                                120 min
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
                            placeholder="e.g., Students can understand the use of present perfect tense, Students can order food in a restaurant"
                            required
                        />
                        </div>
                        <div className="text-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Submit Plan
                        </button>
                        </div>
                    </form>

                </div>

            )
        }

    </Layout>
    )
}

export default Plan
