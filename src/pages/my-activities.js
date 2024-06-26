import PageHeaderComponent from "@/components/page-header"
import EmptyStateComponent from "@/components/empty-state.component"
import ContentGridComponent from "@/components/content-grid.component"
import ActivityCard from "@/components/activity-card.component"
import { useActivities } from "@/context/activities.context"

const MyActivities = () => {

    const { activities } = useActivities()
        
    return (
        <>
            <PageHeaderComponent text='My Activities' />
            {
                activities && activities.length ? (
                    <ContentGridComponent contents={activities} CardComponent={<ActivityCard />} />
                ) : (
                    <div className="min-h-full flex justify-center items-center py-32" >
                        <EmptyStateComponent size='2x' text="It's time to create classroom materials in seconds." href="/activities" />
                    </div>
                )
                    
            }
        </>
    )
}

export default MyActivities