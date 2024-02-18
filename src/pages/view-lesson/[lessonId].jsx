import { db } from '../../../firebaseConfig'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import Layout from '@/components/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrownOpen } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import LessonMetadataComponent from '@/components/lesson-metadata.component'
import LessonSectionTitle from '@/components/lesson-section-title.component'
import { useEffect, useState } from 'react'
import { stripHtml } from 'string-strip-html'
import { useErrorHandling } from '@/hooks/use-error-handling.hook'
import TinyMceEditor from '@/components/tinymce-editor.component'
import InlineLoadingComponent from '@/components/inline-loading.component'
import HtmlContentPresentationComponent from '@/components/html-content-presentation/html-content-presentation.component'
import LoadingSpinner from '@/components/loading-spinner'


const ViewLesson = ({lessonData, lessonId, error}) => {

    const { contentRef, level, public: isLocked }       = lessonData   //Destructure lessonData
    const { handout: handoutUrl }                       = contentRef   //Destructure contentRef

    const { handleError } = useErrorHandling()

    const [ planLoading, setPlanLoading ] = useState(true)
    const [ handoutLoading, setHandoutLoading ] = useState(true)
    const [ handoutGenerating, setHandoutGenerating ] = useState(false)

    const [ lessonPlanContent, setLessonPlanContent ]   = useState('')
    const [ handoutContent, setHandoutContent ]         = useState('')

    const [ lessonStatus, setLessonStatus ] = useState(lessonData.status || 'pending')
    const [ lessonPlanUrl, setLessonPlanUrl ] = useState(contentRef.plan || '')

    //Function to generate a handout for the class
    const generateHandout = async () => {

        //If lesson plan loaded and lesson plan content exists
        if (lessonPlanContent && !planLoading) {

            setHandoutLoading(true) //Set handout loading state true
            setHandoutGenerating(true)

            //Strip lesson plan of html
            const strippedLessonPlan = stripHtml(lessonPlanContent).result

            try {
                //Get handout response
                const handoutResponse = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_URL}createStudentHandout`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ level, lessonId, lessonPlan: strippedLessonPlan })
                })

                //Handle error response
                if (!handoutResponse.ok) {
                    handleError(handoutResponse.status)
                    return
                }

                const handoutData = await handoutResponse.json()    //Parse data to JSON
                setHandoutContent(handoutData.lessonHandout)        //Set handout content
            } catch (error) {
                console.error('Error calling createStudentHandout: ', error.message)
                handleError(error)
            } finally {
                setHandoutGenerating(false)
                setHandoutLoading(false)
            }
        }

    }

    useEffect(() => {

        //If lesson plan still being generated
        if (lessonStatus === 'pending') {
            //Reference to the lesson document
            const lessonDocRef = doc(db, 'lessons', lessonId)

            //Listen for real-time updates
            const unsubscribe = onSnapshot(lessonDocRef, (doc) => {
                if (doc.exists()) {
                    const updatedData = doc.data()
                    setLessonStatus(updatedData.status)
                    setLessonPlanContent(updatedData.temporaryLessonPlan)
                    if (updatedData.status === 'complete') {
                        setLessonPlanUrl(updatedData.contentRef.plan || '')
                        unsubscribe()
                    }
                } else {
                    //TODO Handle case where document does not exist
                }
            })

            //Clean up the listener
            return () => {
                unsubscribe()
            }
        }

    }, [lessonId])

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

        if (lessonPlanUrl && !lessonPlanContent) {
            fetchLessonPlan()
        }

    }, [])

    /** Load Handout */
    useEffect(() => {

        //Function to fetch handout using API route
        const fetchHandout = async () => {

            try {

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
                <LessonSectionTitle title='Lesson Plan' />
                {
                    lessonPlanContent ? (
                        isLocked ? (
                            <HtmlContentPresentationComponent htmlContent={lessonPlanContent} title={lessonData.topic} />
                        ) : (
                            <TinyMceEditor title='Lesson Plan' contentUrl={lessonPlanUrl} value={lessonPlanContent} setValue={setLessonPlanContent} id={lessonId} disabled={lessonStatus === 'pending'} />
                        )
                        
                    ) : lessonStatus === 'failed' ? (
                        <p>Failed.</p>
                    ) : (
                        <LoadingSpinner />
                    )
                }

                {/* Handout */}
                <LessonSectionTitle title='Student Handout' />
                {
                    handoutLoading ? (
                        handoutGenerating ? (
                            <InlineLoadingComponent />
                        ) : (<p>Loading...</p>)
                    ) : (
                        handoutContent ? (
                            //TODO should take actual content as prop to prevent double loading
                            isLocked ? (
                                <HtmlContentPresentationComponent htmlContent={handoutContent} title={`Handout - ${lessonData.topic}`} />
                            ) : (
                                <TinyMceEditor value={handoutContent} setValue={setHandoutContent} contentUrl={handoutUrl} id={lessonId} title='Student Handout' />
                            )
                            
                        ) : (
                            <div >
                                <button disabled={!lessonPlanContent} onClick={generateHandout} className="block md:w-auto bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors duration-300 m-auto" >
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
                        <Link href="/mailing" className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300 w-fit">
                            Sign Up for Updates
                        </Link>
                    </div>

                </div>
                
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