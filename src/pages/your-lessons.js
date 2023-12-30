import Layout from "@/components/layout";
import LessonsGrid from "@/components/lessons-grid.component";
import LoadingSpinner from "@/components/loading-spinner";
import { useEffect, useState } from "react";

const YourLessons = () => {
    const [ lessons, setLessons ]   = useState([]);
    const [ isLoading, setIsLoading ]   = useState(true)

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const storedLessonIds = JSON.parse(localStorage.getItem('lessonIds')) || [];
                const lessonIdsQuery = storedLessonIds.join(',');

                const res = await fetch(`/api/get-user-lessons?ids=${lessonIdsQuery}`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch lessons, status: ${res.status}`);
                }
                const fetchedLessons = await res.json();
                console.log('fetched lessons: ', fetchedLessons)
                setLessons(fetchedLessons);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchLessons()
    }, [])

    return (
        <Layout title='Your Lessons'>
            {
                isLoading ? (
                    <div className="min-h-96 flex justify-center items-center p-4">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <ul className="min-h-96 p-4">

                        {lessons.length > 0 ? (
                            <LessonsGrid lessons={lessons} />
                        ) : (
                            <p>No lessons planned yet.</p>
                        )}

                    </ul>
                )
            }

        </Layout>
    )
}

export default YourLessons