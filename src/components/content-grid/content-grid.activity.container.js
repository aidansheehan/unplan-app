import ACTIVITY_INFO from '@/constants/activity-info.constant'
import ContentGridComponent from './content-grid.component'

/**
 * Container component to render an activity content grid from activities data
 */
const ContentGridActivityContainer = ({activities}) => {

    const formattedActivities = activities.map(a_ => {

        const { topic, level, ageGroup, activity, id } = a_                                 // Destructure activity metadata
        const activityName                              = ACTIVITY_INFO[activity].title     // Get activity name
        let listData                                    = []                                // Init listData

        if (activity === 'findSbWho') {
            listData = [
                // a_.topic,
                a_.level,
                a_.ageGroup,
            ]
        } else if (activity === 'readingComprehension') {
            listData = [
                a_.textComplexityLevel,
                a_.ageGroup,
            ]
        } else if (activity === 'grammarVocab') {
            listData = [
                a_.ageGroup,
                a_.level
            ]
        }

        // Add activity name to list data
        listData.unshift(activityName)

        const Icon = ACTIVITY_INFO[activity].icon

        return {
            name: topic,
            listData,
            href: `/activities/${id}`,
            icon: <Icon />
        }
    })

    return <ContentGridComponent contents={formattedActivities} />
}

export default ContentGridActivityContainer