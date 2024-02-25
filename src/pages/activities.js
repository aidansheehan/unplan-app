import { faBookOpen, faFileAlt, faUsers } from "@fortawesome/free-solid-svg-icons"
import ActivityLinkComponent from "@/components/activity-link.component"
import Link from "next/link"
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

            <div className="mt-4 text-center px-8">
                    <h2 className="text-2xl font-bold mb-4 text-blue-800">Looking for something else, Teach?</h2>
                    <p className="text-md text-gray-600 mb-6">Missing the perfect activity for your class? Let us know what you need, and we'll aim to add it to our creation tools!</p>
                    <Link href="/feedback" className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-300 inline-block">
                        Share Your Ideas
                    </Link>
                </div>

            </div>


    )
}

export default ProtectedRoute(Activities)