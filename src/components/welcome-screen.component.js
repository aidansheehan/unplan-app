import Link from "next/link"
import { PlusCircleIcon, AcademicCapIcon, BookOpenIcon } from "@heroicons/react/24/outline"
import PageHeaderComponent from "./page-header"

/**
 * Welcome screen for new users at dashboard
 */
const WelcomeScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-4 text-center">
          <PageHeaderComponent text='Welcome to UNPLAN!' />
          <p className="mb-6 text-secondaryText">Start creating engaging ESL lesson plans and classroom activity materials.</p>
          <div className="space-y-4">
            <Link href="/plan" className="flex items-center justify-center gap-2 px-6 py-3 text-primaryText bg-primary rounded-md hover:bg-darkPrimary focus:outline-none focus:ring-2 focus:ring-darkPrimary focus:ring-offset-2">
                <PlusCircleIcon className="w-6 h-6 text-primaryText" />
                Create Your First Lesson Plan
            </Link>
            <Link href="/activities" className="flex items-center justify-center gap-2 px-6 py-3 text-primaryText bg-accent rounded-md hover:bg-darkPrimary focus:outline-none focus:ring-2 focus:ring-darkPrimary focus:ring-offset-2">
                <AcademicCapIcon className="w-6 h-6 text-primaryText" />
                Create Classroom Activities
            </Link>
            <Link href="/library" className="flex items-center justify-center gap-2 px-6 py-3 text-primaryText bg-lightPrimary rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                <BookOpenIcon className="w-6 h-6 text-primaryText" />
                Browse Our Lesson Plan Library
            </Link>
          </div>
        </div>
      )
}

export default WelcomeScreen
