import { faBookOpen, faFileAlt, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Layout from "@/components/layout"
import Link from "next/link"
import ActivityLinkComponent from "@/components/activity-link.component"

const ACTIVITIES = [
    {
        href: '/create-worksheet',
        icon: faFileAlt,
        title: 'Create Worksheet',
        description: 'Design interactive grammar and vocabulary worksheets.'
    },
    {
        href: '/create-findSbWho',
        icon: faUsers,
        title: 'Create Find Someone Who',
        description: 'Engage students in conversational activities.'
    },
    {
        href: '/create-reading-task',
        icon: faBookOpen,
        title: 'Create Reading Comprehension',
        description: 'Craft exercises to improve reading skills'
    }
]

/**
 * Page to select a new activity to create
 */
const Activities = () => {

    return (
        <Layout >
<div className="p-4 md:p-8 flex-grow">

<div className="text-center mb-12">
    <h2 className="text-2xl font-bold mb-2">ESL Activity Creator</h2>
    <p className="text-md text-gray-600">Choose an activity type to create tailored exercises for your ESL classroom.</p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {
            ACTIVITIES.map((activity, idx) => {

                //Destructure activity
                const { href, icon, title, description } = activity

                const isEvenIndex   = !(idx % 2)                                            //Check index odd / even
                const bgColor       = isEvenIndex ? 'bg-orange-100' : 'bg-green-100'        //Assign bg color
                const iconColor     = isEvenIndex ? 'text-orange-500' : 'text-green-500'    //Assign icon color

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

  {/* TODO here should be library of activities created by user */}
</div>


        </Layout>
    )
}

export default Activities

// export default Activities