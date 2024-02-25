import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileAlt } from "@fortawesome/free-solid-svg-icons"

/**
 * Icon for grammar-vocabulary card
 */
const GramVocabIconComponent = () => (
    <div className={`p-4 inline-flex rounded-full bg-gray-500 mr-4`}>
        <FontAwesomeIcon icon={faFileAlt} size='2x' />
    </div>
)

export default GramVocabIconComponent