import { faClock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

/**
 * Clock icon to display lesson time
 */
const LessonClockComponent = ({duration}) => {

    return (
        <div className="flex items-center justify-center bg-blue-500 text-white rounded-lg p-2">
          <FontAwesomeIcon icon={faClock} size='sm'/>
          <span className="ml-2 text-md">{duration} min</span>
        </div>
      )
}

export default LessonClockComponent