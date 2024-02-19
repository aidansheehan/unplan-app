import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth.context'
import { useEffect, useState } from 'react'

/**
 * Higher-order wrapper component for redirecting authenticated
 * users from certain routes
 */
const RedirectIfAuthenticated = (Component) => {
    return function WithRedirect(props) {

        const [ ready, setReady ] = useState(false) // Ready state

        const { user, loading } = useAuth()
        const router            = useRouter()

        useEffect(() => {

            // Loading finished
            if (!loading) {

                // User is authenticated
                if (user) {

                    // Redirect to the home page
                    router.push('/')
                }

                // User is not authenticated
                else {

                    // Set ready state to show content
                    setReady(true)
                }
            }

        }, [loading, user, router])

        // If loading, show nothing and wait for check to resolve
        if (!ready) return null

        // User is not authenticated, render the intended component (e.g., login or signup)
        return <Component {...props} />
    }
}

export default RedirectIfAuthenticated