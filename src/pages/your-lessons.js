import Layout from "@/components/layout";
import LessonsGrid from "@/components/lessons-grid.component";
import LoadingSpinner from "@/components/loading-spinner";
import SearchBarComponent from "@/components/search-bar.component";
import { useAuth } from "@/context/auth.context";
import { useError } from "@/context/error.context";
import ProtectedRoute from "@/hoc/protected-route.hoc";
import useLessons from "@/hooks/use-lessons.hook";

const YourLessons = () => {

    const { handleError }   = useError()
    const { getToken }      = useAuth()

    //Function to fetch user's lessons
    const fetchYourLessons = async () => {

        const authToken = await getToken()
        if (!authToken) {
            throw new Error('User is not authenticated')
        }

        // Get user lessons response
        const res = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_URL}getUserLessons`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })

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

export default ProtectedRoute(YourLessons)