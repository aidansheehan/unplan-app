import { toast } from 'react-hot-toast'
import { FUNCTION_ERROR_MESSAGES } from '@/constants/function-error-messages.constant'
import { STATUS_CODE_ERROR_MESSAGES } from '@/constants/status-code-error-messages.constant'

/**
 * Global error handling logic for the application
 */
export const useErrorHandling = () => {

    // Function to handle an error
    const handleError = (error) => {

        let errorMessage = 'Something went wrong! Please try again or contact us if the error persists.'

        // If error is status code
        if (error && typeof error === 'number') {

            // Try to map to friendly status code error message
            errorMessage = STATUS_CODE_ERROR_MESSAGES[error] || errorMessage
        }

        // Error is a custom error message
        else if (error && typeof error === 'string') {

            // Set errorMessage as provided string
            errorMessage = error
        }

        // Error is an Error instance
        else if (error && error instanceof Error) {

            // Look for friendly message mapping for the error message, or show message directly, or default message if nothing found
            errorMessage = FUNCTION_ERROR_MESSAGES[error.message] || errorMessage
        }

        // Display error using react-hot-toast
        toast.error(errorMessage)

        // TODO some errors require logout
    }

    return { handleError }
}
