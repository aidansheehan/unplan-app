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


const ViewLesson = ({lessonData, lessonId, error}) => {

    const { contentRef }                                = lessonData    //Destructure lessonData
    const { handout: handoutUrl, plan: lessonPlanUrl }  = contentRef    //Destructure contentRef

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
                <ContentEditorComponent title='Lesson Plan' contentUrl={lessonPlanUrl} id={lessonId} />

                {/* Handout */}
                <LessonSectionTitle title='Student Handout' />
                {
                    handoutUrl ? (
                        <ContentEditorComponent title='Student Handout' contentUrl={handoutUrl} id={lessonId} />
                    ) : (
                        <div >
                            {/* TODO generate handout button */}
                            <button>Click Me!</button>
                        </div>
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