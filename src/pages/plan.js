import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout';
// import { useRouter } from 'next/router';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPrint } from '@fortawesome/free-solid-svg-icons'
import ViewLessonPlanComponent from '@/components/view-lesson-plan.component';

export default function Plan() {
  // State for form inputs
  const [formData, setFormData] = useState({
    topic: '',
    level: '',
    duration: '',
    objectives: '',
  });

  const [lessonPlan, setLessonPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false)

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


  if (isLoading) {
    return <p>Loading...</p>    //TODO placeholder for loading state
  }

    // Display lesson plan UI
    if (lessonPlan) {
        return (
            <Layout title='Your Lesson' >

                {/* Lesson Plan */}
                <ViewLessonPlanComponent lessonPlan={lessonPlan} />

            </Layout>
        )
        return (
          <Layout title="Lesson Plan">
          <div className="flex">
  {/* Left Column for Lesson Plan */}
  <div className="flex-grow p-4">
    <h2 className="text-xl font-semibold mb-4">Your Lesson Plan</h2>
    <div 
      className="border p-4 rounded-md shadow-sm bg-white leading-relaxed"
      dangerouslySetInnerHTML={{ __html: lessonPlan }}      
    />
  </div>

  {/* Right Column for Actions */}
  <div className="flex-shrink-0 p-4">
    <button 
      onClick={() => openForPrint(lessonPlan)}
      className="bg-gray-500 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring focus:ring-blue-300 mb-4"
    >
      <FontAwesomeIcon icon={faPrint} />
      <span className="ml-2">Print</span>
    </button>
    <button 
      // Add onClick handler for generating materials
      className="bg-gray-500 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring focus:ring-blue-300"
    >
      {/* Add icon for materials */}
      <span className="ml-2">Generate Materials</span>
    </button>
  </div>
</div>

            {/* <div className="relative max-w-xl mx-auto space-y-4">
                <button onClick={() => openForPrint(lessonPlan)} className="bottom-5 right-5 z-10 bg-gray-500 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring focus:ring-blue-300" >
                    <FontAwesomeIcon icon={faPrint} />
                    <span className="ml-2" >PRINT</span>
                </button>
              <h2 className="text-xl font-semibold">Your Lesson Plan</h2>
              <div 
                className="border p-4 rounded-md shadow-sm bg-white"
                dangerouslySetInnerHTML={{ __html: lessonPlan }}      
              />
              <div className="text-center my-4">
                <Link href="/plan" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Create Another Plan
                </Link>
              </div>
            </div> */}
          </Layout>
        );
      }

  return (

    <Layout title='Create Your Lesson Plan'>
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
    </Layout>

  );
}
