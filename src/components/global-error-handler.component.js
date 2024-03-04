import { useErrorHandling } from "@/hooks/use-error-handling.hook"
import { appEvents } from "@/services/app-events"
import { useEffect } from "react"

/**
 * Handle pub/sub of global errors
 */
const GlobalErrorHandlerComponent = () => {

    const { handleError } = useErrorHandling()

    useEffect(() => {
        appEvents.on('error', handleError)

        return () => {
            appEvents.off('error', handleError)
        }
    }, [])

    return null
}

export default GlobalErrorHandlerComponent