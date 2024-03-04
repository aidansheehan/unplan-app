import { useAuth } from '@/context/auth.context'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * Sign-out button
 */
const SignOutButtonComponent = () => {

    const { logout } = useAuth()

    const handleSignOut = async () => {
        try {
            await logout()          // Log user out
            
        } catch (error) {
            console.error('Failed to sign out: ', error)
        }
    }

    return (
        <button
            onClick={handleSignOut}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200 text-sm flex items-center justify-starts mb-3"
        >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Sign Out
        </button>
    )

    return (
        <button onClick={handleSignOut}>
            Sign Out
        </button>
    )
}

export default SignOutButtonComponent