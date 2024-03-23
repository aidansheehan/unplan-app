import { faFrownOpen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

const NotFound = () => {
    return (
        <div className="w-full h-full p-4 text-center">
            <FontAwesomeIcon icon={faFrownOpen} size="3x" className="text-orange-500 mb-4" />
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Oops!</h2>
            <p className="text-lg text-blue-700 mb-6">
                We couldn't find the document you're looking for. It might have been removed or the link could be incorrect.
            </p>
            <Link href="/" className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-300">
                    Go Back to Home
            </Link>
        </div>
    )
}

export default NotFound