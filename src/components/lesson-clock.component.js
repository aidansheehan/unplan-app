import { ClockIcon } from "@heroicons/react/24/outline"

/**
 * Clock icon to display lesson time
 */
const LessonClockComponent = ({duration}) => {

    return (
        <div className="flex items-center justify-center bg-[#fdc717] text-gray-900 rounded-lg p-2">
          <ClockIcon />
          <span className="ml-2 text-md">{duration} min</span>
        </div>
      )
}

export default LessonClockComponent