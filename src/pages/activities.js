import { faBookOpen, faFileAlt, faUsers } from "@fortawesome/free-solid-svg-icons"
import ActivityLinkComponent from "@/components/activity-link.component"
import ProtectedRoute from "@/hoc/protected-route.hoc"
import PageHeaderComponent from "@/components/page-header"

/**
 * TODO should maybe be part of ACTIVITY_INFO constant
 */
const ACTIVITIES = [
    {
        href: '/create-worksheet',
        icon: faFileAlt,
        title: 'Create Worksheet',
        description: 'Design interactive grammar and vocabulary worksheets.',
        bgColor: 'bg-green-100',
        iconColor: 'text-green-500'
    },
    {
        href: '/create-findSbWho',
        icon: faUsers,
        title: "Create 'Find Someone Who...'",
        description: 'Engage students in conversational activities.',
        bgColor: 'bg-purple-100',
        iconColor: 'text-purple-500'
    },
    {
        href: '/create-reading-task',
        icon: faBookOpen,
        title: 'Create Reading Comprehension',
        description: 'Craft exercises to improve reading skills',
        bgColor: 'bg-yellow-100',
        iconColor: 'text-yellow-500'
    }
]

/**
 * Page to select a new activity to create
 */
const Activities = () => {

    return (

        <div>

            <PageHeaderComponent text='ESL Activity Creator' />

            <div className="text-center mb-12">
                <p className="text-md text-gray-600">Choose an activity type to create tailored exercises for your ESL classroom.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {
                        ACTIVITIES.map((activity, idx) => {

                            //Destructure activity
                            const { href, icon, title, description, bgColor, iconColor } = activity

                            return (
                                <ActivityLinkComponent 
                                    href={href}
                                    icon={icon}
                                    title={title}
                                    description={description}
                                    bgColor={bgColor}
                                    iconColor={iconColor}
                                    key={idx}
                                />
                            )

                        })
                    }

            </div>

        </div>

)
}

export default ProtectedRoute(Activities)