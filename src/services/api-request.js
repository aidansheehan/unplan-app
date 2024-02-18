import { appEvents } from "./app-events"

/**
 * Global request handler, with error handling
 */
const apiRequest = async (path, { authToken, body, method = 'GET', ...customConfig } = {}) => {

    // Construct request config
    const config = {
        method,
        ...customConfig,
        headers: {
            'Content-Type': 'application/json',
            ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {}),
            ...customConfig.headers
        },
        body: body ? JSON.stringify(body) : null
    }

    try {

        // Make the request
        const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_URL}${path}`, config)

        // Handle not-ok status response
        if (!response.ok) {
            console.log('RESPONSE NOT OK!')
            appEvents.emit('error', response.status)
            return
        }

        // Parse to JSON
        const jsonResponse = await response.json()

        return jsonResponse

        // Attempt to parse JSON regardless of response.ok status
    } catch (error) {
        console.error(error)                // Log the error
        appEvents.emit('error', error)      // Emit the error for handling
    }
    
}

export default apiRequest