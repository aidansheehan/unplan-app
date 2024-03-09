import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './auth.context'
import { db } from '../../firebaseConfig'
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'

const ActivitiesContext = createContext()

export const ActivitiesProvider = ({ children }) => {

    const [ activities, setActivities ]     = useState([])
    const [ isLoading, setIsLoading ]       = useState(true)
    const { user, loading: authLoading }    = useAuth()

    useEffect(() => {

        // If no user
        if (!user) {

            // If auth finished loading
            if (!authLoading) {
                setIsLoading(false) // Finish loading activities (no activities to load)
            }

            // Return early
            return
        }

        const q = query(collection(db, 'activities'), where('uid', '==', user.uid), orderBy('updatedAt', 'desc'))

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const activitiesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setActivities(activitiesData)
            setIsLoading(false)
        })

        return () => unsubscribe()
    }, [user])

    return (
        <ActivitiesContext.Provider value={{ activities, isLoading }} >
            {children}
        </ActivitiesContext.Provider>
    )
}

export const useActivities = () => useContext(ActivitiesContext)