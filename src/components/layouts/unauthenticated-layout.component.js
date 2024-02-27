
/**
 * Layout for unauthenticated users
 */
const UnauthLayout = ({children}) => {
    return (
        <div className='w-full h-full flex justify-center items-center min-h-screen bg-custom-background' >
            {children} 
        </div>
    )
}

export default UnauthLayout