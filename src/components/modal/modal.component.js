import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

/**
 * Generic modal component
 */
const ModalComponent = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded shadow">
            <button onClick={onClose} className="float-right font-bold">
                <FontAwesomeIcon icon={faXmark} size='xl' />
            </button>
            {children}
            </div>
        </div>
    )
}

export default ModalComponent