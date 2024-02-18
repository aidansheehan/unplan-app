import Layout from "@/components/layout";
import LessonsGrid from "@/components/lessons-grid.component";
import LoadingSpinner from "@/components/loading-spinner";
import SearchBarComponent from "@/components/search-bar.component";
import { useAuth } from "@/context/auth.context";
import { useErrorHandling } from "@/hooks/use-error-handling.hook";
import ProtectedRoute from "@/hoc/protected-route.hoc";
import useLessons from "@/hooks/use-lessons.hook";
import apiRequest from "@/services/api-request";

const YourLessons = () => {

    const { handleError }   = useErrorHandling()
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
        <Layout title='Your Lessons'>
            <div className="p-8 w-full flex-grow flex flex-col" >
                <SearchBarComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                {isLoading ? <LoadingSpinner /> : <LessonsGrid lessons={filteredLessons} />}
            </div>

        </Layout>
    )

}

export default ProtectedRoute(YourLessons)