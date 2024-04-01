import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import RedirectIfAuthenticated from '@/hoc/redirect-if-authenticated'

const ContinueWithoutAccount = () => {
    const router = useRouter()

    useEffect(() => {

        // Check if the user is already signed in
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            
            // If not already signed in
            if (!user) {
                signInAnonymously(auth) // Sign the user in annonymously
            }
        })

        // Clean up the subscription on unmount
        return () => unsubscribe()

    }, [router])

    return <div>Signing in anonymously...</div>
}

export default RedirectIfAuthenticated(ContinueWithoutAccount)