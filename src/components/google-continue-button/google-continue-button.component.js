import useGoogleSignIn from '@/hooks/use-google-sign-in.hook'
import GoogleSigninIconComponent from './google-signin.icon.component'
// import GoogleSignInIcon from './google-signin.svg'

/**
 * 'Continue with Google' button
 * TODO add onClick handler
 * TODO follow google brand guidelines https://developers.google.com/identity/branding-guidelines
 */
const GoogleContinueButtonComponent = () => {

    const { signIn, loading } = useGoogleSignIn()

    return (
        <>
            <button 
                onClick={signIn}
                // className="flex items-center justify-center gap-4 w-full px-4 py-2 border border-gray-300 rounded shadow-sm font-bold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <GoogleSigninIconComponent />
            </button>

            {/* Divider with 'or */}
            <div className="relative flex items-center w-full my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-400 flex-shrink">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
        </>
    )
}

export default GoogleContinueButtonComponent