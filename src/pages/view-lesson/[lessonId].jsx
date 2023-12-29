import { db } from '../../../firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import Layout from '@/components/layout'
import TextContentPresentationComponent from '@/components/text-content-presentation.component'
import { useEffect, useState } from 'react'

const ViewLesson = ({lessonPlanUrl, handoutUrl}) => {

    // const [ lessonPlanContent, setLessonPlanContent ]   = useState('Loading lesson plan...')
    // const [ handoutContent, setHandoutContent ]         = useState('Loading handouts...')

//   // Fetch markdown content using the API route
//   const fetchMarkdownContent = async (urlPath) => {
//     try {
//       const response = await fetch(`/api/fetch-markdown-content?urlPath=${encodeURIComponent(urlPath)}`);
//       const data = await response.json();
//       return data.content;
//     } catch (error) {
//       console.error('Error fetching markdown content:', error);
//       return 'Failed to load content.';
//     }
//   }

    // //componentDidMount
    // useEffect(() => {

    //     //Fetch lesson plan markdown content
    //     fetchMarkdownContent(lessonPlanUrl).then(content => setLessonPlanContent(content))

    //     //Fetch handout markdown content
    //     fetchMarkdownContent(handoutUrl).then(content => setHandoutContent(content))
    // }, [lessonPlanUrl, handoutUrl])

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