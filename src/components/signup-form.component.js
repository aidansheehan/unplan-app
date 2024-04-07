import React from 'react'
import { useForm } from 'react-hook-form'
import GoogleContinueButtonComponent from './google-continue-button.component'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import { AUTH_ERROR_MESSAGES } from '@/constants/auth-error-messages.constant'
import { toast } from 'react-hot-toast'

const SignupForm = ({ isAnonymousUser = false }) => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async (data) => {

        // TODO handle mailing list signup
        const { email, password, username, mailingList } = data

        try {

            // Create the user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            // Update the user's profile with their name
            if (userCredential.user) {
                await updateProfile(userCredential.user, {
                    displayName: username
                })
            }

            // If user wants to sign up to mailingList
            if (mailingList) {

                // Sign user up to mailing list without awaiting completion TODO error handling
                fetch('/api/subscribe', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
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
        <div className="flex min-h-full flex-1 flex-col justify-center py-6 sm:py-12 sm:px-6 lg:px-8 text-primaryText">

        <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
        
          <div className={`bg-white px-6 py-6 md:py-12 ${isAnonymousUser ? '' : 'sm:shadow sm:rounded-lg'} sm:px-12`}>

            <h2 className="mb-6 text-center text-2xl font-bold leading-9 tracking-tight font-heading">
                { isAnonymousUser ? "Sign Up to Continue Using UNPLAN" : "Let's Go!"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" >

                <div>
                    <label htmlFor="username" className="block text-sm font-medium leading-6">
                        Your Name
                    </label>
                    <div className="mt-2">
                <input
                        {...register('username', { required: 'Username is required.', minLength: { value: 4 } })}
                        id="username"
                        name="username"
                        type="text" // Changed to text as it's a username
                        autoComplete="name"
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-divider placeholder:text-secondaryText focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                    />
                    </div>
                    {errors.username && <p className="text-red-500 text-xs italic">{errors.username.message}</p>}
                </div>


              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6">
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
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-divider placeholder:text-secondaryText focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6">
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
                    className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-divider placeholder:text-secondaryText focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6 ${errors.password ? 'border-red-500' : ''}`}
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
                        className="h-4 w-4 rounded border-divider focus:ring-accent text-accent"
                        />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                        <label htmlFor="mailingList" className="font-medium">
                            Join Mailing List
                        </label>
                        <p id="mailingList-description" className="text-secondaryText">
                            Get exclusive access to the latest updates and news
                        </p>
                    </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="font-nav flex w-full justify-center rounded-md bg-primaryText px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryText"
                >
                  Sign up
                </button>
              </div>
            </form>

            <div>
              <div className="relative mt-10">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-divider" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-secondaryText">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <GoogleContinueButtonComponent />

              </div>
            </div>

          </div>
            {/* TODO link */}
            <p className="mt-10 text-center text-sm text-secondaryText">
                By clicking "Create Account" or "Continue with Google", you agree to our <a href='https://assets-global.website-files.com/65e5a3a5d547e0db23df6a87/65e9c5007c2d96bf2e2a7741_unplan-terms-of-service.pdf' className="font-semibold hover:text-accent" target='_blank' >TOS</a> and <a href='https://assets-global.website-files.com/65e5a3a5d547e0db23df6a87/65e9c50092b6f28749fd2d1c_unplan-privacy-policy.pdf' className="font-semibold hover:text-accent" target='_blank'>Privacy Policy</a>.
            </p>

        </div>
      </div>
    )

}

export default SignupForm
