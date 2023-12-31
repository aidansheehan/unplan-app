import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useError } from '@/context/error.context';
import { useRouter } from 'next/router';

/**
 * Handle errors gracefully
 */
const ErrorPage = () => {
  const { clearError, error }  = useError()
  const router          = useRouter()

  const handleReload = () => {
    clearError();
    window.location.reload(); // Reload the current page
  }

  const handleFeedback = () => {
    clearError()
    router.push('/feedback')
  }

  if (!error) return <></>

  return (
    <div className="fixed inset-0 bg-blue-100 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 text-center">
        <FontAwesomeIcon icon={faExclamationTriangle} size="3x" className="text-orange-500 mb-4" />
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Oops, something went wrong!</h2>
        <p className="text-lg text-blue-700 mb-6">
          We apologize for the inconvenience. Please try reloading the page, or report the issue if it persists.
        </p>
        <button 
          onClick={handleReload} 
          className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-300 mr-4"
        >
          Reload Page
        </button>
        <button className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300" onClick={handleFeedback}>
            Report Error
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
