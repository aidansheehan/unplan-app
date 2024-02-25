import ContentGridLessonContainer from "@/components/content-grid/content-grid.lesson.container";
import LoadingSpinner from "@/components/loading-spinner";
import PageHeaderComponent from "@/components/page-header";
import SearchBarComponent from "@/components/search-bar.component";
import { useAuth } from "@/context/auth.context";
import ProtectedRoute from "@/hoc/protected-route.hoc";
import useLessons from "@/hooks/use-lessons.hook";
import apiRequest from "@/services/api-request";

const YourLessons = () => {

    const { getToken }      = useAuth()

    //Function to fetch user's lessons
    const fetchYourLessons = async () => {

        const authToken = await getToken()

        // Get user lessons
        const lessons = await apiRequest('getUserLessons', { authToken })

        // Return the lessons
        return lessons;
    }

    const { isLoading, searchTerm, setSearchTerm, filteredLessons } = useLessons(fetchYourLessons)

    return (
        <div className="flex flex-col" >
            <PageHeaderComponent text='My Lessons' />
            <SearchBarComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {isLoading ? <LoadingSpinner /> : <ContentGridLessonContainer lessons={filteredLessons} />}
        </div>
    )

}

export default ProtectedRoute(YourLessons)