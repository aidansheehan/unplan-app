import { db } from '../../../firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import Layout from '@/components/layout'
import TextContentPresentationComponent from '@/components/text-content-presentation/text-content-presentation.component'

const ViewLesson = ({lessonPlanUrl, handoutUrl}) => {

    return (
        <Layout title='Your Lesson' >

            {/* Lesson Plan */}
            <TextContentPresentationComponent title='Lesson Plan' mdContentUrl={lessonPlanUrl} />

            {/* Lesson Handouts */}
            <TextContentPresentationComponent title='Handouts' mdContentUrl={handoutUrl} />

        </Layout>

    )
}

export async function getServerSideProps(context) {

    //Get lessonId from params
    const { lessonId } = context.params

    //Fetch lesson data from firestore
    const lessonDocRef  = doc(db, 'lessons', lessonId)
    const lessonDoc     = await getDoc(lessonDocRef)

    //lessonDoc not found TODO handle
    if (!lessonDoc.exists()) {
        return {
            notFound: true
        }
    }

    //Get lessonData
    const lessonData = lessonDoc.data()

    //Destructure lessonData
    const { lessonPlanUrl, handoutUrl } = lessonData

    return {
        props: {
            lessonPlanUrl,
            handoutUrl
        }
    }

}

export default ViewLesson