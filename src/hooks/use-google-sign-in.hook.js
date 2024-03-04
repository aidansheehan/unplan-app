import { useState } from 'react'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../firebaseConfig'

/**
 * Hook to handle google sign in
 */
const useGoogleSignIn = () => {
    const [ loading, setLoading ]   = useState(false)

    //Function to handle google sign-in
    const signIn = async () => {
        setLoading(true)
        const provider = new GoogleAuthProvider()   //Init google auth provider

        try {
            await signInWithPopup(auth, provider)

        } catch (error) {
            // TBD handle errors gracefully
            console.error('Error during sign in with Google: ', error)
        } finally {
            setLoading(false)
        }
    }

    return { signIn, loading }
}

export default useGoogleSignIn
