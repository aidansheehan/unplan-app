import LessonClockComponent from "../lesson-clock.component"
import ContentGridComponent from "./content-grid.component"

/**
 * Container component to render a lesson content grid from lessons data
 */
const ContentGridLessonContainer = ({lessons}) => {

    const formattedLessons = lessons.map(l => {

        const { id, duration, topic, level, ageGroup, objectives } = l  // Destructure lesson data

        // Construct listData
        const listData = [ level, ageGroup ]

        return { name: topic, description: objectives,  listData, href: `/view-lesson/${id}`, icon: <LessonClockComponent duration={duration} /> }
    })

    return <ContentGridComponent contents={formattedLessons} />
}

export default ContentGridLessonContainer