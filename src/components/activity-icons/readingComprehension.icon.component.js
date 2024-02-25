import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookOpen } from "@fortawesome/free-solid-svg-icons"

/**
 * Icon for reading-comprehension card
 */
const ReadingComprehensionIconComponent = () => (
    <div className={`p-4 inline-flex rounded-full bg-gray-500 mr-4`}>
        <FontAwesomeIcon icon={faBookOpen} size='2x' />
    </div>
)

export default ReadingComprehensionIconComponent