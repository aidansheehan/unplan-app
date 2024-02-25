import ContentGridActivityContainer from '@/components/content-grid/content-grid.activity.container'
import ContentGridLessonContainer from '@/components/content-grid/content-grid.lesson.container'
import DashboardSection from '@/components/dashboard.section.component'
import PageHeaderComponent from '@/components/page-header'
import { useAuth } from '@/context/auth.context'
import ProtectedRoute from '@/hoc/protected-route.hoc'
import apiRequest from '@/services/api-request'
import { useEffect, useState } from 'react'

const CONTENT_LIMIT = 3

const Home = () => {

    const { user, getToken } = useAuth()
    const [ recentLessons, setRecentLessons ] = useState([])
    const [ recentActivities, setRecentActivities ] = useState([])
    const [ isLoadingLessons, setIsLoadingLessons ] = useState(true)
    const [ isLoadingActivities, setIsLoadingActivities ] = useState(true)
    // const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {

        const fetchRecentLessons = async () => {
            const authToken = await getToken()

            // Build the query parameters string based on whether a limit is provided
            const queryParams = `?limit=${CONTENT_LIMIT}`

            const lessons = await apiRequest(`getUserLessons${queryParams}`, { authToken })

            setRecentLessons(lessons)
        }

        const fetchRecentActivities = async () => {

            // Get auth token
            const authToken = await getToken()

            // Build the query parameters string based on whether a limit is provided
            const queryParams = `?limit=${CONTENT_LIMIT}`

            const activities = await apiRequest(`getActivities${queryParams}`, { authToken })

            setRecentActivities(activities)

        }

        fetchRecentLessons().then(() => {
            setIsLoadingLessons(false)
        })

        fetchRecentActivities().then(() => {
            setIsLoadingActivities(false)
        })

    }, [ user, getToken ])

    return (
        <>
            <PageHeaderComponent text='Dashboard' />
            <DashboardSection 
              title='Recent Lessons' 
              link1={{
                  text: 'See all',
                  href: '/your-lessons'
              }} 
              link2={{
                  text: 'Create',
                  href: '/plan'
              }}
            >
              {isLoadingLessons ? <p>Loading...</p> : <ContentGridLessonContainer lessons={recentLessons} />}
            </DashboardSection>
            <DashboardSection 
              title='Recent Activities'
              link1={{
                text: 'See all',
                href: '/activities'
              }}
              link2={{
                text: 'Create',
                href: '/activities'
              }}
            >
                { isLoadingActivities ? <p>Loading...</p> : <ContentGridActivityContainer activities={recentActivities} />}
            </DashboardSection>
        </>
    )

}

export default ProtectedRoute(Home)
