
/**
 * Generic modal wrapper component
 */
const ModalWrapperComponent = ({ children }) => {
    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center p-4">
            <div className="bg-white min-w-full rounded-lg shadow-xl m-4 md:max-w-xl md:min-w-min max-h-full overflow-auto">
                {children}
            </div>
        </div>
    )
}

export default ModalWrapperComponent