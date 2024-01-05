import { faBookOpen, faFileAlt, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Layout from "@/components/layout"
import Link from "next/link"

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
    {/* Worksheet Button */}
    <Link href='create-worksheet' className="border border-gray-300 rounded-lg shadow-sm hover:shadow-md p-4 hover:border-gray-400">
      <div className="flex items-center justify-center mb-3">
        <div className="rounded-full bg-gray-200 p-2">
          <FontAwesomeIcon icon={faFileAlt} className="text-blue-500" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-center mb-1">Create Worksheet</h3>
      <p className="text-sm text-gray-600 text-center">Design interactive worksheets for ESL learning.</p>
    </Link>

    {/* Find Someone Who Button */}
    <Link href='create-findSbWho' className="border border-gray-300 rounded-lg shadow-sm hover:shadow-md p-4 hover:border-gray-400">
      <div className="flex items-center justify-center mb-3">
        <div className="rounded-full bg-gray-200 p-2">
          <FontAwesomeIcon icon={faUsers} className="text-green-500" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-center mb-1">Create Find Someone Who</h3>
      <p className="text-sm text-gray-600 text-center">Engage students in conversational activities.</p>
    </Link>

    {/* Reading Comprehension Button */}
    <Link href='create-reading-task' className="border border-gray-300 rounded-lg shadow-sm hover:shadow-md p-4 hover:border-gray-400">
      <div className="flex items-center justify-center mb-3">
        <div className="rounded-full bg-gray-200 p-2">
          <FontAwesomeIcon icon={faBookOpen} className="text-red-500" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-center mb-1">Create Reading Comprehension</h3>
      <p className="text-sm text-gray-600 text-center">Craft exercises to improve reading skills.</p>
    </Link>
  </div>

  {/* TODO here should be library of activities created by user */}
</div>


        </Layout>
    )
}

export default Activities

// export default Activities