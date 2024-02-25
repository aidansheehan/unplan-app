import Layout from "@/components/layout"
import LessonsGrid from "@/components/lessons-grid.component"
import LoadingSpinner from "@/components/loading-spinner"
import SearchBarComponent from "@/components/search-bar.component"
import ProtectedRoute from "@/hoc/protected-route.hoc"
import useLessons from "@/hooks/use-lessons.hook"
import apiRequest from "@/services/api-request"

/**
 * Page to display lesson library
 */
const Library = () => {

    //Function to fetch library lessons
    const fetchlibraryLessons = async () => {

        const res = await apiRequest('getLessons?public=true')

        return res
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


export default ProtectedRoute(Library)