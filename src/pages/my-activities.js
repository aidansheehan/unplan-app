import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth.context"
import apiRequest from "@/services/api-request"
import PageHeaderComponent from "@/components/page-header"
import LoadingSpinner from "@/components/loading-spinner"
import EmptyStateComponent from "@/components/empty-state.component"
import ContentGridComponent from "@/components/content-grid.component"
import ActivityCard from "@/components/activity-card.component"

const MyActivities = () => {

    const [ myActivities, setMyActivities ] = useState([])
    const [ isLoading, setIsLoading ]       = useState(true)

    const { getToken } = useAuth()

    useEffect(() => {

        // Function to fetch activities
        const fetchMyActivities = async () => {
            const authToken = await getToken()

            const activities = await apiRequest('getActivities', { authToken })

            setMyActivities(activities)

        }

        fetchMyActivities().then(() => {
            setIsLoading(false)
        })
    }, [ getToken ])
        
        return (
            <>
                <PageHeaderComponent text='My Activities' />

                {
                    isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        myActivities && myActivities.length ? (
                            <ContentGridComponent contents={myActivities} CardComponent={<ActivityCard />} />
                        ) : (
                            <div className="min-h-full flex justify-center items-center py-32" >
                                <EmptyStateComponent size='2x' text="It's time to create classroom materials in seconds." href="/activities" />
                            </div>
                        )
                        
                    )
                }
            </>
        )
}

export default MyActivities