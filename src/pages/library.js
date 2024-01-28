import Layout from "@/components/layout"
import LessonsGrid from "@/components/lessons-grid.component"
import LoadingSpinner from "@/components/loading-spinner"
import SearchBarComponent from "@/components/search-bar.component"
import { useError } from "@/context/error.context"
import useLessons from "@/hooks/use-lessons.hook"

/**
 * Page to display lesson library
 */
const Library = () => {

    const { handleError } = useError()

    //Function to fetch library lessons
    const fetchlibraryLessons = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_URL}getLessons?public=true`)
        if (!res.ok) {
            handleError(res.status)
            throw new Error(`Failed to fetch public lessons, status: ${res.status}`)
        }
        return res.json()
    }

    const { isLoading, searchTerm, setSearchTerm, filteredLessons } = useLessons(fetchlibraryLessons)

    return (
        <Layout title='Lesson Library' >
            <div className="p-8 w-full flex-grow flex flex-col" >
                <SearchBarComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                {isLoading ? <LoadingSpinner /> : <LessonsGrid lessons={filteredLessons} />}
            </div>
        </Layout>
    )

}


export default Library