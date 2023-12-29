import { ref, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../../../firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import Layout from '@/components/layout'
import TextContentPresentationComponent from '@/components/text-content-presentation.component'

const ViewLesson = ({lessonPlanContent, handoutContent}) => {
    return (
        <Layout title='Your Lesson' >

            {/* Lesson Plan */}
            <TextContentPresentationComponent title='Lesson Plan' mdContent={lessonPlanContent} />

            {/* Lesson Handouts */}
            <TextContentPresentationComponent title='Handouts' mdContent={handoutContent} />

        </Layout>

    )
}


export async function getServerSideProps(context) {

    //Get lessonId from params
    const { lessonId } = context.params

    //Fetch lesson data from firestore
    const lessonDocRef  = doc(db, 'lessons', lessonId)
    const lessonDoc     = await getDoc(lessonDocRef)

    //lessonDoc not found
    if (!lessonDoc.exists()) {
        return {
            notFound: true
        }
    }

    //Get lessonData
    const lessonData = lessonDoc.data()

    //Function to fetch markdown content from storage
    const fetchMarkdownContent = async (urlPath) => {
        try {
            const url       = await getDownloadURL(ref(storage, urlPath))
            const response  = await fetch(url)

            return await response.text()
        } catch (error) {
            console.error('Error fetching markdown content:', error)
            return ''
        }
    }

    const lessonPlanContent = await fetchMarkdownContent(lessonData.lessonPlanUrl)  //Fetch lessonPlanContent
    const handoutContent    = await fetchMarkdownContent(lessonData.handoutUrl)     //Fetch handoutContent

    return {
        props: { lessonPlanContent, handoutContent }
    }
}

export default ViewLesson