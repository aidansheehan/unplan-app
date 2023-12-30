import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebaseConfig"
import Layout from "@/components/layout"
import LessonsGrid from "@/components/lessons-grid.component"

/**
 * Page to display lesson library
 */
const Library = ({lessons}) => {

    return (
        <Layout title='Lesson Library' >
            <div className="p-6">
                <LessonsGrid lessons={lessons} />
            </div>
        </Layout>
    )

}

export async function getServerSideProps() {

    //Fetch all lesson data from firestore with public flag
    const lessonsCollectionRef = query(collection(db, 'lessons'), where('public', '==', true ))

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