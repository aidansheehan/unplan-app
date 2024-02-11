import { useContext, createContext, useState, useEffect } from 'react'
import { signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../firebaseConfig'

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [ user, setUser ]         = useState(null)    //User state
    const [ loading, setLoading ]   = useState(true)    //Loading state

    // Sign out function
    const logout = async () => {
        await signOut(auth)
        setUser(null)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{user, loading, logout}}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}