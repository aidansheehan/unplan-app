
/**
 * Global event emitter
 */
class EventEmitter {
    constructor() {
        this.events = {}
    }

    // Subscribe to an event
    on(eventName, listener) {
        if (!this.events[eventName]) {
            this.events[eventName] = []
        }
        this.events[eventName].push(listener)
    }

    // Emit an event
    emit(eventName, ...args) {
        const listeners = this.events[eventName]
        if (listeners && listeners.length) {
            listeners.forEach((listener) => listener(...args))
        }
    }

    // Remove a listener for an event
    off(eventName, listenerToRemove) {
        if (!this.events[eventName]) return
        this.events[eventName] = this.events[eventName].filter(listener => listener !== listenerToRemove)
    }
}

/** Instantiate & export EventEmitter for use throughout application */
export const appEvents = new EventEmitter()