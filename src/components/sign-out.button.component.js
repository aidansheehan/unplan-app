import { useAuth } from '@/context/auth.context'
import { useRouter } from 'next/router'

/**
 * Sign-out button
 */
const SignOutButtonComponent = () => {

    const { logout } = useAuth()
    const router     = useRouter()

    const handleSignOut = async () => {
        try {
            await logout()          // Log user out
            
        } catch (error) {
            console.error('Failed to sign out: ', error)
        }
    }

    return (
        <button onClick={handleSignOut}>
            Sign Out
        </button>
    )
}

export default SignOutButtonComponent