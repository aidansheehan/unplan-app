import React from 'react'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import GoogleContinueButtonComponent from './google-continue-button/google-continue-button.component'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'
import { auth } from '../../firebaseConfig'
import { AUTH_ERROR_MESSAGES } from '@/constants/auth-error-messages.constant'
import { toast } from 'react-hot-toast'

const SignupForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const router = useRouter()

    const onSubmit = async (data) => {

        // TODO handle mailing list signup
        const { email, password/*, mailingList*/ } = data

        try {
            await createUserWithEmailAndPassword(auth, email, password)     // Create the user
            await signInWithEmailAndPassword(auth, email, password)         // Sign the new user in
            router.push('/')                                                // Redirect to protected route

        } catch (error) {

            console.error(error)

            // Map code to friendly message to display to user
            const friendlyMessage = AUTH_ERROR_MESSAGES[error.code] || 'Failed to create user'

            // Display error toast
            toast.error(friendlyMessage)
        }


    };

    return (
        <div className="flex flex-col items-center justify-center bg-white p-10 rounded-lg md:shadow-md md:max-w-md text-sm text-center my-4">

            <h2 className="text-2xl font-bold text-gray-800 mb-8">Sign up for Easy Plan ESL</h2>

            {/* Google Sign-in Button */}
            <GoogleContinueButtonComponent />

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit(onSubmit)} className='w-full'>

                {/* Email input */}
                <div className="mb-4 w-full">
                    <div className="flex border rounded w-full">
                        <span className="flex items-center bg-gray-100 border-r p-2">
                            <FontAwesomeIcon icon={faEnvelope} className="text-gray-500"/>
                        </span>
                        <input
                            {...register('email', { required: 'Email is required.', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address.' } })}
                            type="email"
                            id="email"
                            className={`w-full p-2 ${errors.email ? 'border-red-500' : ''}`}
                            placeholder="Email"
                            autoComplete='email'
                        />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                </div>

                {/* Password input */}
                <div className="mb-4">

                <div className="flex border rounded">
                <span className="flex items-center bg-gray-100 border-r p-2">
                    <FontAwesomeIcon icon={faLock} className="text-gray-500"/>
                </span>
                <input
                    {...register('password', { required: 'Password is required.', minLength: { value: 6, message: 'Password must be at least 6 characters.' } })}
                    type="password"
                    id="password"
                    className={`w-full p-2 ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="Password"
                    autoComplete='new-password'
                />
                </div>
                {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                </div>

                {/* Mailing List Input */}
                {/* TODO how will google users sign up for mailing list? */}
                <div className="flex items-center justify-between mb-4">
                <label className="flex items-center">
                    <input 
                        {...register('mailingList')}
                        type="checkbox" 
                        id="mailingList"
                        className="form-checkbox cursor-pointer" 
                    />
                    <span className="ml-2 text-sm text-gray-600">I agree to join Easy Plan ESL's mailing list</span>
                </label>
                </div>

                {/* Submit Button */}
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full transition-colors duration-300 mb-6">
                    Create Account
                </button>

            </form>

            {/* Agreement Section */}
            <p className='text-xs text-gray-400 mb-4' >
                By clicking "Create Account" or "Continue with Google", you agree to the Easy Plan ESL TOS and Privacy Policy.
            </p>


            {/* Login Redirect Section */}
            <div className='mb-4'>
                <p className='text-sm text-gray-500'>
                    Already have an account?{" "}
                    <Link href='/login' className='text-blue-500 hover:text-blue-600'>
                        Log in
                    </Link>
                </p>
            </div>



        </div>
    )

}

export default SignupForm
