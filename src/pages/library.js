import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebaseConfig"
import Layout from "@/components/layout"
import LessonCard from "@/components/lesson-card.component"

/**
 * Page to display lesson library
 */
const Library = ({lessons}) => {

    return (
        <Layout title='Lesson Library' >
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lessons.map(lesson => (
                        <LessonCard key={lesson.id} lesson={lesson} />
                    ))}
                </div>
            </div>
        </Layout>
    )

}

export async function getServerSideProps() {

    //Fetch all lesson data from firestore
    const lessonsCollectionRef = collection(db, 'lessons')

    const lessonsSnapshot = await getDocs(lessonsCollectionRef)
    
    const lessons = lessonsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    return {
        props: {
            lessons
        }
    }
}

export default Library