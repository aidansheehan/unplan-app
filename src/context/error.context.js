import React, { createContext, useContext, useState } from 'react'

const ErrorContext = createContext()

export const useError = () => useContext(ErrorContext)

export const ErrorProvider = ({children}) => {
    const [ error, setError ] = useState(null)

    const handleError = (error) => {
        setError(error)
    }

    const clearError = () => {
        setError(null)
    }

    return (
        <ErrorContext.Provider value={{ error, handleError, clearError }} >
            {children}
        </ErrorContext.Provider>
    )
}