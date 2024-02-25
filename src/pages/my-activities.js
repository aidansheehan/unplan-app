import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth.context"
import apiRequest from "@/services/api-request"
import PageHeaderComponent from "@/components/page-header"
import ContentGridActivityContainer from "@/components/content-grid/content-grid.activity.container"

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
                        <p>Loading...</p>
                    ) : (
                        <ContentGridActivityContainer activities={myActivities} />
                    )
                }
            </>
        )
}

export default MyActivities