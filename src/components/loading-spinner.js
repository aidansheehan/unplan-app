
/**
 * Display loading state
 */
const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center h-full absolute left-[calc(50%-64px)]">
            <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-500"></div>
        </div>
    )
}

export default LoadingSpinner