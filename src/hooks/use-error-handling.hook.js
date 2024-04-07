import { toast } from 'react-hot-toast'
import { FUNCTION_ERROR_MESSAGES } from '@/constants/function-error-messages.constant'
import { STATUS_CODE_ERROR_MESSAGES } from '@/constants/status-code-error-messages.constant'
import { useAuth } from '@/context/auth.context'

// Define a list of status codes that require logout
const logoutErrorCodes = [401, 403]

// Define a list of error messages that require logout
const logoutErrorMessages = [
    'auth/id-token-expired',
    'auth/id-token-revoked',
    'auth/invalid-user-token',
    'auth/session-cookie-expired',
    'auth/session-cookie-revoked',
    'auth/token-expired',
    'auth/credential-too-old'
]

/**
 * Global error handling logic for the application
 */
export const useErrorHandling = () => {

    const { user, logout } = useAuth()

    // Function to force a user to logout or signup
    const forceLogout = async () => {

        // Check if the uesr is anonymous
        const isAnonymous = user?.isAnonymous || false

        // Don't log the user out if they're anonymous
        if (isAnonymous) {
            toast('Please create an account to continue')
            return
        }

        // Log the user out
        await logout()

        // Display toast
        toast.error('Your session has expired. Please sign in again to continue.')
    }

    // Function to handle an error
    const handleError = async (error) => {

        let errorMessage = 'Something went wrong! Please try again or contact us if the error persists.'

        // If error is status code
        if (error && typeof error === 'number') {

            // If code indicates session invalid
            if (logoutErrorCodes.includes(error)) {

                // Log the user out
                await forceLogout()
            
                return  // Early return to prevent further execution
            }

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

            // If message indicates session invalid
            if (logoutErrorMessages.includes(error.message || error.code)) {

                // Log the user out
                await forceLogout()

                return  // Early return to prevent further execution
            }

            // Look for friendly message mapping for the error message, or show message directly, or default message if nothing found
            errorMessage = FUNCTION_ERROR_MESSAGES[error.message] || errorMessage
        }

        // Display error using react-hot-toast
        toast.error(errorMessage)

        // TODO some errors require logout
    }

    return { handleError }
}
