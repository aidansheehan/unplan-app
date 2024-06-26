import { useEffect } from "react"

/**
 * Full-page preloader component
 */
const PreloaderComponent = ({ appLoaded, setPreloadFinished }) => {

    useEffect(() => {

        // If resources loaded
        if (appLoaded) {
            
            // Allow time for animation to complete before removing component
            const timer = setTimeout(() => {
                // Set preload state finished to remove component from the DOM
                setPreloadFinished(true)
            }, 700)

            return () => clearTimeout(timer)
        }

    }, [appLoaded])

    return (
        <div className="absolute flex items-center justify-center w-full h-screen bg-primary z-100">
            <div className={`transition-opacity duration-700 ${appLoaded ? 'opacity-0' : 'opacity-100'}`} >
            <h1 className="text-5xl font-bold text-primaryText font-heading animate-pulse">UNPLAN.</h1> 
            </div>
          
        </div>
      )
}

export default PreloaderComponent