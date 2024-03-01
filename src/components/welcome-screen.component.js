import Link from "next/link"
import { PlusCircleIcon, AcademicCapIcon, BookOpenIcon } from "@heroicons/react/24/outline"
import PageHeaderComponent from "./page-header"


/**
 * Welcome screen for new users at dashboard
 */
const WelcomeScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-4 text-center">
          {/* <h2 className="mb-2 text-2xl font-semibold text-gray-800">Welcome to UnPlan!</h2> */}
          <PageHeaderComponent text='Welcome to UnPlan!' />
          <p className="mb-6 text-gray-600">Start creating engaging ESL lesson plans and classroom activity materials.</p>
          <div className="space-y-4">
            <Link href="/plan" className="flex items-center justify-center gap-2 px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <PlusCircleIcon className="w-6 h-6" />
                Create Your First Lesson Plan
            </Link>
            <Link href="/activities" className="flex items-center justify-center gap-2 px-6 py-3 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                <AcademicCapIcon className="w-6 h-6" />
                Create Classroom Activities
            </Link>
            <Link href="/library" className="flex items-center justify-center gap-2 px-6 py-3 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                <BookOpenIcon className="w-6 h-6" />
                Browse Our Lesson Plan Library
            </Link>
          </div>
        </div>
      )
}

export default WelcomeScreen