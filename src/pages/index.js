import ActivityCard from '@/components/activity-card.component'
import ContentGridComponent from '@/components/content-grid.component'
import DashboardSection from '@/components/dashboard.section.component'
import EmptyStateComponent from '@/components/empty-state.component'
import LessonCard from '@/components/lesson-card.component'
import LoadingSpinner from '@/components/loading-spinner'
import PageHeaderComponent from '@/components/page-header'
import WelcomeScreen from '@/components/welcome-screen.component'
import { useActivities } from '@/context/activities.context'
import { useLessons } from '@/context/lessons.context'
import ProtectedRoute from '@/hoc/protected-route.hoc'

const Home = () => {

    const { lessons, isLoading: isLoadingLessons } = useLessons()
    const { activities, isLoading: isLoadingActivities } = useActivities()

    const recentLessons     = lessons.slice(0, 2)       // Take most recent two lessons for display
    const recentActivities  = activities.slice(0, 2)    // Take most recent two activities for display


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
