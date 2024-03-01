import React from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import GoogleContinueButtonComponent from './google-continue-button.component'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'
import { auth } from '../../firebaseConfig'
import { toast } from 'react-hot-toast'
import { AUTH_ERROR_MESSAGES } from '@/constants/auth-error-messages.constant'

const LoginFormComponent = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const router = useRouter()

    //Handle login (email + password) submit
    const onSubmit = async (data) => {

        const { email, password } = data    //Destructure login data

        try {
            await signInWithEmailAndPassword(auth, email, password)
            // router.push('/')
        } catch (error) {

            console.error(error)

            // Map code to friendly message to display to user
            const friendlyMessage = AUTH_ERROR_MESSAGES[error.code] || 'Something went wrong! Please try again'
            
            // Display error toast
            toast.error(friendlyMessage)
        }
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-6 sm:py-12 sm:px-6 lg:px-8">

        <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
        
          <div className="bg-white px-6 py-6 md:py-12 shadow sm:rounded-lg sm:px-12">

            {/* <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8 "> */}
                <h2 className="mb-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-700 font-heading">
                    Welcome Back!
                </h2>
            {/* </div> */}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" >
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-buttonHover sm:text-sm sm:leading-6"
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
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-buttonHover sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">

                {/* TODO implement 'Remember Me' */}
                {/* <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-buttonHover focus:ring-buttonHover"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                    Remember me
                  </label>
                </div> */}

                <div className="text-sm leading-6">
                  <Link href="/forgot-password" className="font-semibold text-buttonBg hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-buttonBg px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-buttonHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-buttonBg"
                >
                  Log In
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

          </div>

        </div>
      </div>
    )

}

export default LoginFormComponent;
