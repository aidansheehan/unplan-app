import { faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

/**
 * Icon for find-sb-who activity
 */
const FindSbWhoIconComponent = () => (
    <div className={`p-4 inline-flex rounded-full bg-gray-500 mr-4`}>
        <FontAwesomeIcon icon={faUsers} size='2x' />
    </div>
)

export default FindSbWhoIconComponent