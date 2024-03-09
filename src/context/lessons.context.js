import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './auth.context'
import { db } from '../../firebaseConfig'
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'

const LessonsContext = createContext()

export const LessonsProvider = ({ children }) => {

    const [ lessons, setLessons ]   = useState([])
    const [ isLoading, setIsLoading ]   = useState(true)
    const { user }                  = useAuth()

    useEffect(() => {
        if (!user) return

        const q = query(collection(db, 'lessons'), where('uid', '==', user.uid), orderBy('updatedAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const lessonsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLessons(lessonsData);
            setIsLoading(false)
        });
        
        return () => unsubscribe()
    }, [user])

    return (
        <LessonsContext.Provider value={{ lessons, isLoading }} >
            {children}
        </LessonsContext.Provider>
    )
}

export const useLessons = () => useContext(LessonsContext)