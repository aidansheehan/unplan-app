import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth.context'

/**
 * Higher-order wrapper component for protected routes
 */
const ProtectedRoute = (Component) => {
    return function Protected(props) {
        const { user, loading } = useAuth()
        const router            = useRouter()

        if (loading) return null

        if (!loading && !user) {
            //Redirect to login if not loading and user is not authenticated
            typeof window !== 'undefined' ? router.push('/login') : null
            return null
        }

        //User is authenticated, render the component
        return <Component {...props} />
    }
}

export default ProtectedRoute