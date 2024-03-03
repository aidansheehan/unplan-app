import ActivityCard from '@/components/activity-card.component'
import ContentGridComponent from '@/components/content-grid.component'
import DashboardSection from '@/components/dashboard.section.component'
import EmptyStateComponent from '@/components/empty-state.component'
import LessonCard from '@/components/lesson-card.component'
import LoadingSpinner from '@/components/loading-spinner'
import PageHeaderComponent from '@/components/page-header'
import WelcomeScreen from '@/components/welcome-screen.component'
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

    if (!isLoadingLessons && !isLoadingActivities && !recentLessons.length && !recentActivities.length) return (
        <WelcomeScreen />
    )

    return (
        <>

            <PageHeaderComponent text='Dashboard' />

            <DashboardSection 
              title='Recent Lesson Plans' 
              hideButtons={!recentLessons.length}
              link1={{
                  text: 'See all',
                  href: '/your-lessons'
              }} 
              link2={{
                  text: 'Create',
                  href: '/plan'
              }}
            >
                {
                    isLoadingLessons ? (
                        <LoadingSpinner />
                    ) : (
                        recentLessons.length ? (
                            <ContentGridComponent contents={recentLessons} CardComponent={<LessonCard />} />
                        ) : (
                            <EmptyStateComponent text="You haven't created any lessons yet." href='/plan' />
                        )
                    )
                }
            </DashboardSection>
            <DashboardSection 
              title='Recent Activities'
              hideButtons={!recentActivities || !recentActivities.length}
              link1={{
                text: 'See all',
                href: '/activities'
              }}
              link2={{
                text: 'Create',
                href: '/activities'
              }}
            >
                {
                    isLoadingActivities ? (
                        <LoadingSpinner />
                    ) : (
                        recentActivities && recentActivities.length ? (
                            <ContentGridComponent contents={recentActivities} CardComponent={<ActivityCard />} />
                        ) : (
                            <EmptyStateComponent text="You haven't created any classroom activity materials yet." href='/activities' />
                        )
                    )
                }

            </DashboardSection>
        </>
    )

}

export default ProtectedRoute(Home)
