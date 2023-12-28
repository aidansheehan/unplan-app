import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout';
import TextContentPresentationComponent from '@/components/text-content-presentation.component';
import LoadingSpinner from '@/components/loading-spinner';

export default function Plan() {
  // State for form inputs
  const [formData, setFormData] = useState({
    topic: '',
    level: '',
    duration: '',
    objectives: '',
  });

  const [lessonPlan, setLessonPlan] = useState('');
  const [lessonMaterials, setLessonMaterials] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [lessonMaterialsLoading, setLessonMaterialsLoading] = useState(false)

//   const router = useRouter()

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    try {
        const response = await fetch('/api/generate-lesson-plan', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          const data = await response.json();

          console.log('DATA: ', data)
    
          if (response.ok) {
            setLessonPlan(data.lessonPlan)
            setIsLoading(false)
            // Navigate to the new page and pass the lesson plan data
            // router.push({
            //   pathname: '/lesson-plan',
            //   query: { plan: JSON.stringify(data.lessonPlan) },
            // });
          } else {
            throw new Error(data.error);
          }
    } catch (error) {
        console.error('Failed to generate lesson plan:', error)
        setIsLoading(false)
    }

  };

  //Handle request materials
  const handleRequestMaterials = async () => {

    console.log('I got called!')
    
    // e.preventDefault()
    setLessonMaterialsLoading(true)

    if (!lessonPlan) {
        console.error("You don't have a lesson plan yet, can't generate a handout")
        return
    }

    const requestData = {
        level: formData.level,
        lessonPlan: lessonPlan
    }

    try {
        const response = await fetch('/api/generate-lesson-handout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        })

        const data = await response.json()

        if (response.ok) {
            setLessonMaterials(data.lessonHandout)
            setLessonMaterialsLoading(false)
        }

        console.log('HANDOUT: ', data.lessonHandout)
    } catch (error) {
        console.error('Failed to generate handouts: ', error)
        setLessonMaterialsLoading(false)
    }

  }


    // Display lesson plan UI
    if (lessonPlan && !isLoading) {
        return (
            <Layout title='Your Lesson' >

                {/* Lesson Plan */}
                <TextContentPresentationComponent title='Lesson Plan' mdContent={lessonPlan} />

                {/* Lesson Materials */}
                {lessonMaterials ? (
                    <TextContentPresentationComponent title='Handouts' mdContent={lessonMaterials} />
                ) : lessonMaterialsLoading ? (<LoadingSpinner />) : (
                    <div className='flex flex-grow justify-center align-center relative max-h-[50%]'>
                        <button onClick={handleRequestMaterials} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
                            Generate Materials
                        </button>
                    </div>
                )}

            </Layout>
        )

      }

  return (

    <Layout title='Create Your Lesson Plan'>
        {
            isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
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
                </>

            )
        }

    </Layout>

  );
}
