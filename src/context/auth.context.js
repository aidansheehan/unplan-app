import { useContext, createContext, useState, useEffect } from 'react'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import { useErrorHandling } from '@/hooks/use-error-handling.hook'

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [ user, setUser ]         = useState(null)    //User state
    const [ loading, setLoading ]   = useState(true)    //Loading state

    const { handleError } = useErrorHandling()

    // Sign out function
    const logout = async () => {
        await signOut(auth)
        setUser(null)
    }

    // Function to get the current user's auth token
    const getToken = async () => {
        if (!user) return null  // No user logged in
        try {
            const token = await user.getIdToken()
            return token;
        } catch (error) {
            console.error('Error getting user token:', error)
            handleError(error)
        }
    }

    // Function to refresh the current user's auth token
    const refreshToken = async () => {
        if (!user) return null  // No user logged in

        try {
            const newToken = await user.getIdToken(true)    // Force token refresh
            return newToken
        } catch (error) {
            console.error('Error refreshing user token: ', error)
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, logout, getToken, refreshToken }}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}