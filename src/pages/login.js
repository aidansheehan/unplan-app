import LoginFormComponent from '@/components/login-form.component'
import RedirectIfAuthenticated from '@/hoc/redirect-if-authenticated'

/**
 * Component to log in
 */
const LogIn = () => {

    return (
        <LoginFormComponent />
    )
}

export default RedirectIfAuthenticated(LogIn)