import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth.context'
import { useEffect, useState } from 'react'

/**
 * Higher-order wrapper component for protected routes
 */
const ProtectedRoute = (Component) => {
    return function Protected(props) {

        const [ ready, setReady ] = useState(false) // Ready state

        const { user, loading } = useAuth()
        const router            = useRouter()

        useEffect(() => {

            // Loading finished
            if (!loading) {

                // User is not authenticated
                if (!user) {

                    // Redirect to login
                    router.push('/login')
                }

                // User is authenticated
                else {

                    // Set ready state true to display content
                    setReady(true)
                }
            }

        }, [loading, user, router])

        // If not ready, show nothing and wait for check to resolve
        if (!ready) return null

        // User is authenticated, render the intended component
        return <Component {...props} />

    }
}

export default ProtectedRoute