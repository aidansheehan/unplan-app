import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ModalComponent from "./modal.component"
import { faLock } from "@fortawesome/free-solid-svg-icons"

const { useForm } = require("react-hook-form")
const { auth } = require("../../../firebaseConfig")
const { updatePassword } = require("firebase/auth")

const ChangePasswordModal = ({ isOpen, onClose }) => {

    const { register, handleSubmit, formState: {errors}, watch } = useForm()
    const newPassword = watch('newPassword')

    const onSubmit = async (data) => {
        const { newPassword } = data

        const user = auth.currentUser
        
        if (user) {
            try {
                await updatePassword(user, newPassword)
                alert('Password updated successfully!')
                onClose()

            } catch (error) {
                console.error(error)
                alert('Failed to update password. Make sure you are logged in and the password is strong enough. Contact us if you need further help.')
            }
        }
    }

    return (
        <ModalComponent isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col items-center justify-center bg-white p-10 rounded-lg max-w-md text-sm text-center my-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Change Your Password</h2>

                {/* Password Change Form */}
                <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                    {/* New Password input */}
                    <div className="mb-4 w-full">
                        <div className="flex border rounded w-full">
                            <span className="flex items-center bg-gray-100 border-r p-2">
                                <FontAwesomeIcon icon={faLock} className="text-gray-500"/>
                            </span>
                            <input
                                {...register('newPassword', {
                                    required: 'New password is required.',
                                    minLength: { value: 6, message: 'Password must be at least 6 characters.' } // Adjust the minimum length as necessary
                                })}
                                type="password"
                                id="newPassword"
                                className={`w-full p-2 ${errors.newPassword ? 'border-red-500' : ''}`}
                                placeholder="New Password"
                                autoComplete='new-password'
                            />
                        </div>
                        {errors.newPassword && <p className="text-red-500 text-xs italic">{errors.newPassword.message}</p>}
                    </div>

                    {/* Confirm New Password input */}
                    {/* Implement a confirm password field if necessary */}

                    {/* Submit Button */}
                    <button type="submit" className="text-white font-bold py-2 px-4 rounded w-full transition-colors duration-300 bg-green-500 hover:bg-green-600 mb-6">
                        Update Password
                    </button>
                </form>
            </div>
        </ModalComponent>
    )
}

export default ChangePasswordModal