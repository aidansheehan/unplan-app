
/**
 * Display loading state
 */
const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center flex-grow w-full min-h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        </div>
    )
}

export default LoadingSpinner