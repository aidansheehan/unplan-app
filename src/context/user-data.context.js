import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './auth.context'
import { db } from '../../firebaseConfig'
import { onSnapshot, doc } from 'firebase/firestore'

const UserDataContext = createContext()

export const UserDataProvider = ({ children }) => {

    const [ userData, setUserData ] = useState({})
    const [ isLoading, setIsLoading ] = useState(true)
    const { user, loading: authLoading } = useAuth()

    useEffect(() => {

        // If no user
        if (!user) {

            // If auth finished loading
            if (!authLoading) {
                setIsLoading(false) // Finish loading
            }

            // Return early
            return
        }

        // const q = query(collection, 'userDatas')
        const userDataDocRef = doc(db, 'Users', user.uid)

        const unsubscribe = onSnapshot(userDataDocRef, (doc) => {
            if (doc.exists()) {
                setUserData(doc.data())
            }
            setIsLoading(false)
        })

        return () => unsubscribe()  // Clean up for listener on unmount

    }, [user, authLoading])

    return (
        <UserDataContext.Provider value={{ userData, isLoading }}>
            {children}
        </UserDataContext.Provider>
    )
}

export const useUserData = () => useContext(UserDataContext)