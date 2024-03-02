import { useRouter } from "next/router"
import ButtonLinkPrimaryComponent from "../button/button.link.primary.component"

/**
 * Layout for unauthenticated users
 */
const UnauthLayout = ({children}) => {

    const router        = useRouter()
    const { pathname }  = router

    return (
        <div className='w-full h-full min-h-screen bg-white sm:bg-primary' >

            <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 bg-primary">
                <div className='flex h-16 shrink-0 py-4 justify-between items-center'>

                    <a href='https://unplan.io' target='_blank' rel='noopener'>
                        {/* <img
                                className="h-10 w-auto"
                                src="/unplan_logo.svg"
                                alt="Unplan"
                        /> */}
                        <h2 className='font-heading text-4xl text-primaryText' >UNPLAN</h2>
                    </a>

                    {
                        pathname.includes('login') && (
                            <div >
                                <span className='text-primaryText mr-4 text-lg font-heading hidden md:inline-block' >Don't have an account?{' '}</span>

                                <ButtonLinkPrimaryComponent href='/signup' >
                                    Sign Up
                                </ButtonLinkPrimaryComponent>
                            </div>
                        )
                    }

                    {
                        pathname.includes('signup') && (
                            <div >
                                <span className='text-primaryText mr-4 text-lg font-heading hidden md:inline-block' >Already using UNPLAN?{' '}</span>

                                <ButtonLinkPrimaryComponent href='/login' >
                                    Login
                                </ButtonLinkPrimaryComponent>

                            </div>
                        )
                    }

                </div>
            
            </div>
            

            <main>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 font-body">{children}</div>
            </main>
        </div>
    )
}

export default UnauthLayout
