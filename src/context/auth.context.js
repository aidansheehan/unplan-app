import { useContext, createContext, useState, useEffect } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../firebaseConfig'

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [ user, setUser ] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })

        return () => unsubscribe()
    }, [user])

    return (
        <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}