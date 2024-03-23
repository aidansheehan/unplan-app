import { db } from '../../../firebaseConfig'
import { doc, onSnapshot } from 'firebase/firestore'
import LessonMetadataComponent from '@/components/lesson-metadata.component'
import LessonSectionTitle from '@/components/lesson-section-title.component'
import { useEffect, useState } from 'react'
import { stripHtml } from 'string-strip-html'
import TinyMceEditor from '@/components/tinymce-editor.component'
import InlineLoadingComponent from '@/components/inline-loading.component'
import HtmlContentPresentationComponent from '@/components/html-content-presentation/html-content-presentation.component'
import LoadingSpinner from '@/components/loading-spinner'
import apiRequest from '@/services/api-request'
import { useAuth } from '@/context/auth.context'
import ProtectedRoute from '@/hoc/protected-route.hoc'
import ButtonSecondaryComponent from '@/components/button/button.secondary.component'
import { useLessons } from '@/context/lessons.context'
import { useRouter } from 'next/router'


const ViewLesson = ({lessonId}) => {

    const { lessons }   = useLessons()                          // Get lessons 
    const router = useRouter()
    const lessonData    = lessons.find(l => l.id == lessonId)   // Get lessonData for this lesson

    // If lessonData not found
    if (!lessonData) {
        router.replace('/not-found')
    }

    const { contentRef, level, uid }       = lessonData   //Destructure lessonData
    const { handout: handoutUrl }          = contentRef   //Destructure contentRef

    const [ planLoading, setPlanLoading ]               = useState(true)
    const [ handoutLoading, setHandoutLoading ]         = useState(true)
    const [ handoutGenerating, setHandoutGenerating ]   = useState(false)
    const [ isOwner, setIsOwner ]                       = useState(false)

    const [ lessonPlanContent, setLessonPlanContent ]   = useState('')
    const [ handoutContent, setHandoutContent ]         = useState('')

    const [ lessonStatus, setLessonStatus ]     = useState(lessonData.status || 'pending')
    const [ lessonPlanUrl, setLessonPlanUrl ]   = useState(contentRef.plan || '')

    const { getToken, user, loading } = useAuth()

    //Function to generate a handout for the class
    const generateHandout = async () => {

        //If lesson plan loaded and lesson plan content exists
        if (lessonPlanContent && !planLoading) {

            setHandoutLoading(true) //Set handout loading state true
            setHandoutGenerating(true)

            // Strip lesson plan of html
            const strippedLessonPlan = stripHtml(lessonPlanContent).result

            // Get user auth token
            const authToken = await getToken()

            // Get handout response
            const response = await apiRequest('createStudentHandout', {
                method: 'POST',
                authToken,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: { level, lessonId, lessonPlan: strippedLessonPlan }
            })

            // Response ok
            if (response && response.lessonHandout) {

                setHandoutContent(response.lessonHandout)   // Set handout content

            }

            setHandoutGenerating(false)
            setHandoutLoading(false)

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
                        setPlanLoading(false)
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

    useEffect(() => {

        // Check if the current user is the lesson creator
        if (user && uid === user.uid) setIsOwner(true)

        else setIsOwner(false)

    }, [lessonId, user])

    if (loading) {
        return (
            <p>
                Loading...
            </p>
        )
    }

    return (

            <div className='p-8 w-full flex-grow flex flex-col' >

                <LessonMetadataComponent lessonData={lessonData} />
                <LessonSectionTitle title='Lesson Plan' />
                {
                    lessonPlanContent ? (
                        !isOwner ? (
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

                {
                    isOwner ? (
                        <>
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
                                        !isOwner ? (
                                            <HtmlContentPresentationComponent htmlContent={handoutContent} title={`Handout - ${lessonData.topic}`} />
                                        ) : (
                                            <TinyMceEditor value={handoutContent} setValue={setHandoutContent} contentUrl={handoutUrl} id={lessonId} title='Student Handout' />
                                        )
                                        
                                    ) : (
                                            <ButtonSecondaryComponent 
                                                disabled={!lessonPlanContent || planLoading}
                                                onClick={generateHandout}
                                                style='w-full'
                                            >
                                                Generate a Student Handout (Experimental)
                                            </ButtonSecondaryComponent>
                                    )
                                )
                            }

                        </>
                    ) : (
                        <></>
                    )
                }
                
            </div>

    )
}

export async function getServerSideProps(context) {

    //Get lessonId from params
    const { lessonId } = context.params

    return {
        props: {
            lessonId
        }
    }

}

export default ProtectedRoute(ViewLesson)