import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth.context'
import { useEffect } from 'react'

/**
 * Higher-order wrapper component for protected routes
 */
const ProtectedRoute = (Component) => {
    return function Protected(props) {

        const { user, loading } = useAuth()
        const router            = useRouter()

        useEffect(() => {

            // Loading finished and user not authenticated
            if (!loading && !user) {

                // User is not authenticated
                if (!user) {

                    // Redirect to login
                    router.push('/login')
                }

            }

        }, [loading, user, router])

        // If not ready, show nothing and wait for check to resolve
        if (loading || !user) return null

        // User is authenticated, render the intended component
        return <Component {...props} />

    }
}

export default ProtectedRoute