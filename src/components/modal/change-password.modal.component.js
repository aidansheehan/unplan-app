import { useAuth } from "@/context/auth.context"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../../../firebaseConfig"
import { toast } from 'react-hot-toast'
import ModalComponent from "./modal.component"
import { AUTH_ERROR_MESSAGES } from "@/constants/auth-error-messages.constant"

/**
 * Send a password reset email to an already authenticated user (ie change password)
 */
const ChangePasswordModal = ({ isOpen, onClose }) => {

    const { user } = useAuth()  // Destructure Auth context

    // Function to send password reset email
    const sendResetEmail = async () => {
        if (user) {
            try {
                await sendPasswordResetEmail(auth, user.email)  // Send the password reset email

                // Display success toast
                toast.success('Password reset email sent successfully! Please check your inbox.')

                onClose()   // Close the modal

            } catch (error) {
                console.error(error)

                // Map code to friendly message to display to user
                const friendlyMessage = AUTH_ERROR_MESSAGES[error.code] || 'Failed to send password reset email'

                // Display error toast
                toast.error(friendlyMessage)
            }
        }
    }

    return (
        <ModalComponent isOpen={isOpen} onClose={onClose} >
            <div className="flex flex-col items-center justify-center bg-white p-10 rounded-lg max-w-md text-sm text-center my-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Reset Your Password</h2>
                <p className="mb-8">Click the button below to receive an email with instructions on how to reset your password.</p>

                {/* Submit Button */}
                <button 
                    onClick={sendResetEmail} 
                    type="button" 
                    className="text-white font-bold py-2 px-4 rounded w-full transition-colors duration-300 bg-blue-500 hover:bg-blue-600 mb-6"
                >
                    Send Reset Email
                </button>
            </div>
        </ModalComponent>
    )
}

export default ChangePasswordModal