import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebaseConfig"
import Layout from "@/components/layout"
import LessonsGrid from "@/components/lessons-grid.component"
import { useEffect, useState } from "react"

/**
 * Page to display lesson library
 */
const Library = ({ lessons }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredLessons, setFilteredLessons] = useState([]);

    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        console.log('lessons: ', lessons)
        const filtered = lessons.filter(lesson => 
            lesson.topic.toLowerCase().includes(lowercasedSearchTerm) ||
            lesson.level.toLowerCase().includes(lowercasedSearchTerm) ||
            // lesson.objective.toLowerCase().includes(lowercasedSearchTerm) ||
            (lesson.ageGroup && lesson.ageGroup.toLowerCase().includes(lowercasedSearchTerm))
        );
        setFilteredLessons(filtered);
    }, [searchTerm, lessons]);

    return (
        <Layout title='Lesson Library'>
            <div className="p-6 min-h-96 w-full">
                <input 
                    type="text"
                    placeholder="Search lessons..."
                    className="w-full p-2 mb-8 border rounded shadow"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <LessonsGrid lessons={filteredLessons} />
            </div>
        </Layout>
    );
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