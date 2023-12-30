import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import FullPageLoading from '@/components/full-page.loading.component';

/**
 * Page to plan a lesson
 */
const Plan = () => {

    const [ formData, setFormData ] = useState({ topic: '', level: '', duration: '', objectives: '' })
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
            const lessonResponse = await fetch('/api/generate-lesson-plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (!lessonResponse.ok) throw new Error('Failed to generate lesson plan')

            const lessonData = await lessonResponse.json()

            //Generate lesson materials
            const handoutResponse = await fetch('/api/generate-lesson-handout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ level: formData.level, lessonPlan: lessonData.lessonPlan, lessonPlanId: lessonData.lessonPlanId })
            })

            if (!handoutResponse.ok) throw new Error('Failed to generate lesson materials')
            const handoutData = await handoutResponse.json()

            //Store lesson ID in local storage
            const storedLessonIds = JSON.parse(localStorage.getItem('lessonIds')) || []
            storedLessonIds.push(handoutData.lessonId)
            localStorage.setItem('lessonIds', JSON.stringify(storedLessonIds))

            //Redirect to view page with lesson ID
            router.push(`/view-lesson/${handoutData.lessonId}`)
            
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
                <div className='w-full h-full'>
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
                            placeholder="Enter lesson topic"
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
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
                        <input
                            type="text"
                            name="duration"
                            id="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            placeholder="Enter lesson duration"
                            required
                        />
                        </div>
                        <div>
                        <label htmlFor="objectives" className="block text-sm font-medium text-gray-700">Objectives</label>
                        <textarea
                            name="objectives"
                            id="objectives"
                            value={formData.objectives}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            placeholder="Enter lesson objectives"
                            required
                        />
                        </div>
                        <div className="text-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Submit Plan
                        </button>
                        </div>
                    </form>
                    <div className="text-center my-4">
                        <Link href="/" className="text-blue-600 hover:underline">
                            Go back to Home
                        </Link>
                    </div>
                </div>

            )
        }

    </Layout>
    )
}

export default Plan
