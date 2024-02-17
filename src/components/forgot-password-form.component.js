import { sendPasswordResetEmail } from "firebase/auth"
import { useForm } from "react-hook-form"
import { auth } from "../../firebaseConfig"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

/**
 * Send password reset email using defualt firebase functionality
 */
const ForgotPasswordFormComponent = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    // Handle forgot password submit
    const onSubmit = async (data) => {
        const { email } = data  // Destructure email from data

        try {
            await sendPasswordResetEmail(auth, email)
            alert('Password reset email sent! Check your inbox.')
            reset()
        } catch (error) {
            console.error(error)
            alert('Something went wrong! Please try again or contact us for further support.')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center bg-white p-10 rounded-lg md:shadow-md max-w-md text-sm text-center my-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Reset Your Password</h2>
            
            {/* Forgot Password Form */}
            <form onSubmit={handleSubmit(onSubmit)} className='w-full'>

                {/* Email input */}
                <div className="mb-4 w-full">
                    <div className="flex border rounded w-full">
                        <span className="flex items-center bg-gray-100 border-r p-2">
                            <FontAwesomeIcon icon={faEnvelope} className="text-gray-500"/>
                        </span>
                        <input
                            {...register('email', {
                                required: 'Email is required.',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Invalid email address.'
                                }
                            })}
                            type="email"
                            id="email"
                            className={`w-full p-2 ${errors.email ? 'border-red-500' : ''}`}
                            placeholder="Enter your email"
                            autoComplete='username'
                        />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="text-white font-bold py-2 px-4 rounded w-full transition-colors duration-300 bg-green-500 hover:bg-green-600 mb-6">
                    Send Reset Email
                </button>
            </form>
        </div>
    )
}

export default ForgotPasswordFormComponent