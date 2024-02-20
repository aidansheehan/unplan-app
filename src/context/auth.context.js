import { useContext, createContext, useState, useEffect } from 'react'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import { appEvents } from '@/services/app-events'

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [ user, setUser ]         = useState(null)    //User state
    const [ loading, setLoading ]   = useState(true)    //Loading state

    // Sign out function
    const logout = async () => {
        setLoading(true); // Start loading
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error('Error signing out: ', error);
            appEvents.emit('error', error);
            // Optionally handle error state here
        } finally {
            setLoading(false); // End loading
        }
    }

    // Function to get the current user's auth token
    const getToken = async () => {
        if (!user) return null  // No user logged in
        try {
            const token = await user.getIdToken()
            return token;
        } catch (error) {
            console.error('Error getting user token:', error)
            appEvents.emit('error', error)
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