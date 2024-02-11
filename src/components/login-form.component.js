import React from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import GoogleContinueButtonComponent from './google-continue-button.component';

const LoginFormComponent = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Handle the form submission logic here
        console.log(data);
    };

    return (
        <div className="flex flex-col items-center justify-center bg-white p-10 rounded-lg md:shadow-md max-w-md text-sm text-center my-4">

            <h2 className="text-2xl font-bold text-gray-800 mb-8">Sign in to Easy Plan ESL</h2>

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
                            {...register('password', { required: 'Password is required.', minLength: { value: 8, message: 'Password must be at least 8 characters.' } })}
                            type="password"
                            id="password"
                            className={`w-full p-2 ${errors.password ? 'border-red-500' : ''}`}
                            placeholder="Password"
                        />
                    </div>
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="text-white font-bold py-2 px-4 rounded w-full transition-colors duration-300 bg-green-500 hover:bg-green-600 mb-6">
                    Log In
                </button>

            </form>

            {/* Forgot Password Section */}
            <div className='mb-4'>
                <Link href='/forgot-password' className='text-sm text-blue-500 hover:text-blue-600'>
                    Forgot your password?
                </Link>
            </div>

            {/* Signup Redirect Section */}
            <div className='mb-4'>
                <p className='text-sm text-gray-500'>
                    Don't have an account?{" "}
                    <Link href='/signup' className='text-blue-500 hover:text-blue-600'>
                        Sign up
                    </Link>
                </p>
            </div>

        </div>
    );
}

export default LoginFormComponent;
