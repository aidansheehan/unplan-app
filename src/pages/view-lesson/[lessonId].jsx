import { db } from '../../../firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import Layout from '@/components/layout'
// import TextContentPresentationComponent from '@/components/text-content-presentation/text-content-presentation.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrownOpen } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import ContentEditorComponent from '@/components/content-editor.component'
import LessonMetadataComponent from '@/components/lesson-metadata.component'
import LessonSectionTitle from '@/components/lesson-section-title.component'
import { useEffect, useState } from 'react'
import { stripHtml } from 'string-strip-html'
import { useError } from '@/context/error.context'
import TinyMceEditor from '@/components/tinymce-editor.component'


const ViewLesson = ({lessonData, lessonId, error}) => {

    const { contentRef, level }                         = lessonData    //Destructure lessonData
    const { handout: handoutUrl, plan: lessonPlanUrl }  = contentRef    //Destructure contentRef

    const { handleError } = useError()

    const [ planLoading, setPlanLoading ] = useState(true)
    const [ handoutLoading, setHandoutLoading ] = useState(true)

    const [ lessonPlanContent, setLessonPlanContent ]   = useState('')
    const [ handoutContent, setHandoutContent ]         = useState('')

    //Function to generate a handout for the class
    const generateHandout = async () => {

        //If lesson plan loaded and lesson plan content exists
        if (lessonPlanContent && !planLoading) {

            setHandoutLoading(true) //Set handout loading state true

            //Strip lesson plan of html
            const strippedLessonPlan = stripHtml(lessonPlanContent).result

            try {
                //Get handout response
                const handoutResponse = await fetch(`http://127.0.0.1:5001/lesson-planner-3eff4/us-central1/createStudentHandout`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ level, lessonId, lessonPlan: strippedLessonPlan })
                })

                //Handle error response
                if (!handoutResponse.ok) {
                    const errorText = await handoutResponse.json()
                    throw new Error(`Failed to generate lesson materials: ${errorText}`)
                }

                const handoutData = await handoutResponse.json()    //Parse data to JSON
                setHandoutContent(handoutData.lessonHandout)        //Set handout content
            } catch (error) {
                console.error('Error calling createStudentHandout: ', error.message)
                handleError(error)
            } finally {
                setHandoutLoading(false)
            }
        }

    }

    /** Load Lesson Plan */
    useEffect(() => {

        const fetchLessonPlan = async () => {
            try {
                //TODO use real firebase
                const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_URL}getContent?urlPath=${encodeURIComponent(lessonPlanUrl)}`)
                const data = await response.json()

                //Set lesson plan state
                setLessonPlanContent(data.content)

            } catch (error) {
                console.error(`Error fetching lesson plan: ${error}`)
                setLessonPlanContent(`<p>Failed to load content.</p>`)
            } finally {
                setPlanLoading(false)
            }
        }

        fetchLessonPlan()

    }, [ lessonPlanUrl ])

    /** Load Handout */
    useEffect(() => {

        //Function to fetch handout using API route
        const fetchHandout = async () => {

            try {
                //TODO use real firebase
                const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_URL}getContent?urlPath=${encodeURIComponent(handoutUrl)}`)
                const data = await response.json()

                //Set handoutContent
                setHandoutContent(data.content)
            } catch (error) {
                console.error(`Error fetching handout: ${error}`)
                setHandoutContent(`<p>Failed to load content.</p>`)
            } finally {
                setHandoutLoading(false)
            }
        }

        //If handoutUrl
        if (handoutUrl) {

            //Set handout loading state true
            setHandoutLoading(true)

            fetchHandout()


        } else {

            //Set loading state false
            setHandoutLoading(false)
        }

    }, [ handoutUrl ])

    if (error) {
        return (
            <Layout title="Lesson Not Found">
                <div className="w-full h-full p-4 text-center">
                    <FontAwesomeIcon icon={faFrownOpen} size="3x" className="text-orange-500 mb-4" />
                    <h2 className="text-2xl font-bold text-blue-900 mb-4">Oops! Lesson not found.</h2>
                    <p className="text-lg text-blue-700 mb-6">
                        We couldn't find the lesson you're looking for. It might have been removed or the link could be incorrect.
                    </p>
                    <Link href="/your-lessons" className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-300">
                            Go Back to Your Lessons
                    </Link>
                </div>
            </Layout>
        )
    }

    return (
        <Layout >

            <div className='p-8 w-full flex-grow flex flex-col' >

                <LessonMetadataComponent lessonData={lessonData} />
                {/* Lesson Plan */}
                {/* <TextContentPresentationComponent title='Lesson Plan' mdContentUrl={lessonPlanUrl} /> */}
                <LessonSectionTitle title='Lesson Plan' />
                {/* <ContentEditorComponent title='Lesson Plan' contentUrl={lessonPlanUrl} id={lessonId} /> */}
                {
                    lessonPlanContent ? (
                        <TinyMceEditor title='Lesson Plan' contentUrl={lessonPlanUrl} value={lessonPlanContent} setValue={setLessonPlanContent} id={lessonId}  />
                    ) : (
                        <p>Loading...</p>
                    )
                }

                {/* Handout */}
                <LessonSectionTitle title='Student Handout' />
                {
                    handoutLoading ? (
                        <p>Loading...</p>
                    ) : (
                        handoutContent ? (
                            //TODO should take actual content as prop to prevent double loading
                            <TinyMceEditor value={handoutContent} setValue={setHandoutContent} contentUrl={handoutUrl} id={lessonId} title='Student Handout' />
                        ) : (
                            <div >
                                <button onClick={generateHandout} className="block md:w-auto bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors duration-300 m-auto" >
                                    Generate Handout
                                </button>
                            </div>
                        )
                    )
                }

                <LessonSectionTitle title='Media' isComingSoon />
                <div className="bg-blue-50 p-6 rounded-lg shadow-md text-sm">
                    <p className='text-gray-700 mb-4 font-semibold'>
                        Get ready to bring your lessons to life with multimedia!
                    </p>
                    <p className="text-gray-700 mb-4">
                        Soon, you'll be able to create audio files for listening activities and enrich your lessons with engaging images.
                    </p>
                    <div className='mt-2 w-full flex justify-center'>
                        <Link href="/signup" className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300 w-fit">
                            Sign Up for Updates
                        </Link>
                    </div>

                </div>



                {/* Lesson Handouts */}
                {/* {
                    handoutUrl && <TextContentPresentationComponent title='Handouts' mdContentUrl={handoutUrl} />
                } */}
                
            </div>

        </Layout>

    )
}

export async function getServerSideProps(context) {

    //Get lessonId from params
    const { lessonId } = context.params

    try {
        //Fetch lesson data from firestore
        const lessonDocRef  = doc(db, 'lessons', lessonId)
        const lessonDoc     = await getDoc(lessonDocRef)

        //lessonDoc not found
        if (!lessonDoc.exists()) {
            throw new Error('Lesson not found')
        }

        const lessonData = lessonDoc.data() //Get lessonData

        //Convert Timestamp to serializable format (ISO string)
        if (lessonData.createdAt && lessonData.createdAt.toDate) {
            lessonData.createdAt = lessonData.createdAt.toDate().toISOString()
        }

        return {
            props: {
                lessonData,
                lessonId
            }
        }
    } catch (error) {
        return {
            props: { error: error.message }
        }
    }


}

export default ViewLesson