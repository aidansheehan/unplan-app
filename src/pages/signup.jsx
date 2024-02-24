import SignupFormComponent from '@/components/signup-form.component'
import RedirectIfAuthenticated from '@/hoc/redirect-if-authenticated'

/**
 * Component to sign up
 */
const SignUp = () => {

    return (
        <SignupFormComponent />
    )
}

export default RedirectIfAuthenticated(SignUp)