import { useContext, createContext, useState, useEffect } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../firebaseConfig'

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [ user, setUser ]         = useState(null)    //User state
    const [ loading, setLoading ]   = useState(true)    //Loading state

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{user, loading}}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}