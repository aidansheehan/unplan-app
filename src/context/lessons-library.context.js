import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './auth.context'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../firebaseConfig'

/**
 * Library context
 * TODO - remove after static library implemented
 */
const LessonsLibraryContext = createContext()

export const LessonsLibraryProvider = ({ children }) => {

    const [ lessons, setLessons ]           = useState([])
    const [ isLoading, setIsLoading ]       = useState(true)
    const { user, loading: authLoading }    = useAuth()

    useEffect(() => {

        // If no user
        if (!user) {

            // If auth state finished loading
            if (!authLoading) {
                setIsLoading(false)  // Finish loading library (no lessons to load)
            }
            
            // Return early
            return
        }

        const q = query(collection(db, 'lessons'), where('public', '==', true))

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const lessonsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLessons(lessonsData);
            setIsLoading(false)
        });
        
        return () => unsubscribe()
    }, [user])

    return (
        <LessonsLibraryContext.Provider value={{ lessons, isLoading }} >
            {children}
        </LessonsLibraryContext.Provider>
    )
}

export const useLessonsLibrary = () => useContext(LessonsLibraryContext)