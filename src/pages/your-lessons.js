import Layout from "@/components/layout";
import LessonsGrid from "@/components/lessons-grid.component";
import LoadingSpinner from "@/components/loading-spinner";
import SearchBarComponent from "@/components/search-bar.component";
import { useError } from "@/context/error.context";
import useLessons from "@/hooks/use-lessons.hook";

const YourLessons = () => {

    const { handleError } = useError()

    //Function to fetch user's lessons
    const fetchYourLessons = async () => {
        const storedLessonIds = JSON.parse(localStorage.getItem('lessonIds')) || []
        const lessonIdsQuery = storedLessonIds.join(',')
        const res = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_URL}getLessons?ids=${lessonIdsQuery}`)
        if (!res.ok) {
            handleError(res.status)
            throw new Error(`Failed to fetch lessons, status: ${res.status}`)
        }
        return res.json()
    }

    const { isLoading, searchTerm, setSearchTerm, filteredLessons } = useLessons(fetchYourLessons)

    return (
        <Layout title='Your Lessons'>
            <div className="p-8 w-full flex-grow flex flex-col" >
                <SearchBarComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                {isLoading ? <LoadingSpinner /> : <LessonsGrid lessons={filteredLessons} />}
            </div>

        </Layout>
    )

}

export default YourLessons