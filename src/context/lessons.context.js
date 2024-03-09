import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './auth.context'
import { db } from '../../firebaseConfig'
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'

const LessonsContext = createContext()

export const LessonsProvider = ({ children }) => {

    const [ lessons, setLessons ]           = useState([])
    const [ isLoading, setIsLoading ]       = useState(true)
    const { user, loading: authLoading }    = useAuth()

    useEffect(() => {

        // If no user
        if (!user) {

            // If auth finished loading
            if (!authLoading) {
                setIsLoading(false) // Finish loading lessons (no lessons to load)
            }

            // Return early
            return
        }

        const q = query(collection(db, 'lessons'), where('uid', '==', user.uid), orderBy('updatedAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const lessonsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLessons(lessonsData);
            setIsLoading(false)
        });
        
        return () => unsubscribe()
    }, [user, authLoading])

    return (
        <LessonsContext.Provider value={{ lessons, isLoading }} >
            {children}
        </LessonsContext.Provider>
    )
}

export const useLessons = () => useContext(LessonsContext)