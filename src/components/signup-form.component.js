import React from 'react'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import GoogleContinueButtonComponent from './google-continue-button.component'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useRouter } from 'next/router'
import { auth } from '../../firebaseConfig'
import { AUTH_ERROR_MESSAGES } from '@/constants/auth-error-messages.constant'
import { toast } from 'react-hot-toast'

const SignupForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const router = useRouter()

    const onSubmit = async (data) => {

        console.log('DATA: ', data)

        // TODO handle mailing list signup
        const { email, password, username/*, mailingList*/ } = data

        try {

            // Create the user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            // Update the user's profile with their name
            if (userCredential.user) {
                await updateProfile(userCredential.user, {
                    displayName: username
                })
            }

            await signInWithEmailAndPassword(auth, email, password)         // Sign the new user in

        } catch (error) {

            console.error(error)

            // Map code to friendly message to display to user
            const friendlyMessage = AUTH_ERROR_MESSAGES[error.code] || 'Failed to create user'

            // Display error toast
            toast.error(friendlyMessage)
        }


    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">

            <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8 ">
                <img
                    className="mx-auto h-10 w-auto"
                    src="/unplan_logo.svg"
                    alt="Unplan"
                />
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 font-heading">
                    Sign up for an account
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500 text-center">
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold text-indigo-700 hover:text-indigo-600">
                        Log in
                    </Link>
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" >

                <div>
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                        Username
                    </label>
                    <div className="mt-2">
                    <input
                        {...register('username', { required: 'Username is required.', minLength: { value: 4 } })}
                        id="username"
                        name="username"
                        type="text" // Changed to text as it's a username
                        autoComplete="username"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                    {errors.username && <p className="text-red-500 text-xs italic">{errors.username.message}</p>}
                </div>


              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    {...register('email', { required: 'Email is required.', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address.' } })}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    {...register('password', { required: 'Password is required.', minLength: { value: 6, message: 'Password must be at least 6 characters.' } })}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.password ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
              </div>

              <div className="relative flex items-start">
                    <div className="flex h-6 items-center">
                        <input
                        {...register('mailingList')}
                        id="mailingList"
                        aria-describedby="mailingList-description"
                        name="mailingList"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                        <label htmlFor="mailingList" className="font-medium text-gray-900">
                            Join Mailing List
                        </label>
                        <p id="mailingList-description" className="text-gray-500">
                            Get exclusive access to the latest updates and news
                        </p>
                    </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
                >
                  Sign up
                </button>
              </div>
            </form>

            <div>
              <div className="relative mt-10">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-900">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <GoogleContinueButtonComponent />

              </div>
            </div>

            {/* TODO link */}
            <p className="mt-10 text-center text-sm text-gray-500">
                By clicking "Create Account" or "Continue with Google", you agree to our TOS and Privacy Policy.
            </p>
          </div>

        </div>
      </div>
    )

}

export default SignupForm
