
/**
 * Layout for unauthenticated users
 */
const UnauthLayout = ({children}) => {
    return (
        <div className='w-full h-full flex justify-center items-center min-h-screen' >
            {children} 
        </div>
    )
}

export default UnauthLayout