import React, { useState } from 'react';
import { useRouter } from 'next/router';
import LoadingSpinner from '@/components/loading-spinner';
import ProtectedRoute from '@/hoc/protected-route.hoc';
import { useAuth } from '@/context/auth.context';
import apiRequest from '@/services/api-request';
import PageHeaderComponent from '@/components/page-header';
import ButtonPrimaryComponent from '@/components/button/button.primary.component';
import { PlusIcon } from '@heroicons/react/24/outline';

/**
 * Page to plan a lesson
 */
const Plan = () => {

    const [ formData, setFormData ]     = useState({ topic: '', level: '', duration: 60, objectives: '', ageGroup: '', isOneToOne: false, isOnline: false })
    const [ isLoading, setIsLoading ]   = useState(false)
    const [ useCEFR, setUseCEFR ]       = useState(false)

    const router            = useRouter()
    const { getToken }      = useAuth()

    //Map function to translate level basic to CEFR and back
    const translateLevel = (currentLevel, toCEFR) => {
        const basicToCEFR = {
            'beginner': 'CEFR A1',
            'intermediate': 'CEFR B1',
            'advanced': 'CEFR C1'

        }
        const cefrToBasic = {
            'CEFR A1': 'beginner',
            'CEFR A2': 'beginner',
            'CEFR B1': 'intermediate',
            'CEFR B2': 'intermediate',
            'CEFR C1': 'advanced',
            'CEFR C2': 'advanced'
        }

        return toCEFR ? basicToCEFR[currentLevel] || currentLevel : cefrToBasic[currentLevel] || currentLevel
    }

    //Toggle CEFR changes
    const toggleCEFR = () => {

        //Translate current level to different schema
        setFormData({
            ...formData,
            level: translateLevel(formData.level, !useCEFR)
        })
        setUseCEFR(!useCEFR)
    }

    //Handle form input changes
    const handleChange = (e) => {
        const { name, value, type } = e.target
        if (type === 'checkbox') {
            const { checked } = e.target
            setFormData({ ...formData, [name]: checked})
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }

    //Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()  //Prevent default form submission behaviour
        setIsLoading(true)  //Set loading state true

        // Get user auth token
        const authToken = await getToken()

        // Create the lesson plan
        const response = await apiRequest('createLessonPlan', {
            authToken,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: formData
        })

        // If response incorrect set loading false and return early
        if (!response || !response.lessonId) {
            setIsLoading(false)
            return
        }

        const { lessonId } = response   // Destructure response

        //Redirect to lesson view page with lesson ID
        router.push(`/view-lesson/${lessonId}`)

    }

    return (

        <div className='flex-grow bg-white'>

            <PageHeaderComponent text='Create a Lesson Plan' />
            
                    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 px-4 py-5 sm:px-6">
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
                            maxLength={50}
                            disabled={isLoading}
                        />
                        </div>

                        <div >
                            <label htmlFor='level' className="block text-sm font-medium text-gray-700">Student Level</label>

                            <div className='flex flex-col-reverse md:flex-row md:flex-wrap gap-2 mt-1' >
                                <select
                                    name="level"
                                    id="level"
                                    value={formData.level}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    className='p-2 border border-gray-300 rounded-md shadow-sm flex-grow'
                                    required
                                    >
                                    <option value="" disabled={formData.level !== ""}>Select a level</option>
                                    {useCEFR ? (
                                        <>
                                        <option value="CEFR A1">A1 (Beginner)</option>
                                        <option value="CEFR A2">A2 (Elementary)</option>
                                        <option value="CEFR B1">B1 (Intermediate)</option>
                                        <option value="CEFR B2">B2 (Upper Intermediate)</option>
                                        <option value="CEFR C1">C1 (Advanced)</option>
                                        <option value="CEFR C2">C2 (Mastery)</option>
                                        </>
                                    ) : (
                                        <>
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                        </>
                                    )}
                                </select>
                                <div className="flex">
                                    <button
                                        type="button"
                                        className={`px-4 py-2 rounded-l-md w-1/2 md:w-auto ${!useCEFR ? 'bg-buttonBg font-semibold text-white' : 'bg-white border border-indigo-200 hover:bg-indigo-50 text-gray-700'}`}
                                        disabled={isLoading}
                                        onClick={toggleCEFR}
                                    >
                                        Basic
                                    </button>
                                    <button
                                        type="button"
                                        className={`px-4 py-2 rounded-r-md w-1/2 md:w-auto ${useCEFR ? 'bg-buttonBg font-semibold text-white' : 'bg-white border border-indigo-200 hover:bg-indigo-50 text-gray-700'}`}
                                        disabled={isLoading}
                                        onClick={toggleCEFR}
                                    >
                                        CEFR
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-700">Student Age Group</label>
                            <select
                                name="ageGroup"
                                id="ageGroup"
                                value={formData.ageGroup}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                disabled={isLoading}
                                required
                            >
                                <option value="">Select an Age Group</option>
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
                                className="p-2 border border-gray-300 rounded-md shadow-sm portrait:w-full md:w-auto"
                                placeholder="e.g., 60"
                                min="5"
                                step="5"
                                disabled={isLoading}
                                required
                                />

                                <button type="button" disabled={isLoading} onClick={() => setFormData({...formData, duration: 60})}
                                        className={`p-2 rounded-md shadow-sm ${formData.duration == 60 ? 'bg-buttonBg font-semibold text-white' : 'border border-indigo-200 hover:bg-indigo-50' }`}>
                                60 min
                                </button>
                                <button type="button" disabled={isLoading} onClick={() => setFormData({...formData, duration: 90})}
                                        className={`p-2 rounded-md shadow-sm ${formData.duration == 90 ? 'bg-buttonBg font-semibold text-white' : 'border border-indigo-200 hover:bg-indigo-50' }`}>
                                90 min
                                </button>
                                <button type="button" disabled={isLoading} onClick={() => setFormData({...formData, duration: 120})}
                                        className={`p-2 rounded-md shadow-sm ${formData.duration == 120 ? 'bg-buttonBg font-semibold text-white' : 'border border-indigo-200 hover:bg-indigo-50' }`}>
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
                            disabled={isLoading}
                            maxLength={400}
                        />
                        </div>

                        <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">

                                {/* oneToOne Input */}
                                <div className="relative flex items-start py-4">
                                    <div className="min-w-0 flex-1 text-sm leading-6">
                                    <label htmlFor='isOneToOne' className="select-none font-medium text-gray-900">
                                        1-to-1 Class
                                    </label>
                                    </div>
                                    <div className="ml-3 flex h-6 items-center">
                                    <input
                                        id='isOneToOne'
                                        name='isOneToOne'
                                        type="checkbox"
                                        checked={formData.isOneToOne}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                        className="h-4 w-4 rounded border-gray-300 text-buttonBg focus:ring-buttonBg"
                                    />
                                    </div>
                                </div>

                                {/* Online Class Input */}
                                <div className="relative flex items-start py-4">
                                    <div className="min-w-0 flex-1 text-sm leading-6">
                                    <label htmlFor='isOnline' className="select-none font-medium text-gray-900">
                                        Online Class
                                    </label>
                                    </div>
                                    <div className="ml-3 flex h-6 items-center">
                                    <input
                                        id='isOnline'
                                        name='isOnline'
                                        type="checkbox"
                                        checked={formData.isOnline}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    </div>
                                </div>

                        </div>
                        
                        <div className="text-center">
                            {
                                isLoading ? (
                                    <LoadingSpinner />
                                ) : (
                                    <ButtonPrimaryComponent type='submit' style='inline-flex mt-6 items-center' >
                                        <PlusIcon className='-ml-0.5 mr-1.5 h-6 w-6' />
                                        Create Plan
                                    </ButtonPrimaryComponent>

                                )
                            }

                        </div>
                    </form>

        </div>

    )
}

export default ProtectedRoute(Plan)
