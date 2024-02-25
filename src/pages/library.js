import ContentGridLessonContainer from "@/components/content-grid/content-grid.lesson.container"
import LoadingSpinner from "@/components/loading-spinner"
import PageHeaderComponent from "@/components/page-header"
import SearchBarComponent from "@/components/search-bar.component"
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
        <div >
            <PageHeaderComponent text='Lesson Library' />
            <SearchBarComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {isLoading ? <LoadingSpinner /> : <ContentGridLessonContainer lessons={filteredLessons} />}
        </div>
    )

}


export default Library