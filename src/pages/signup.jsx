import Layout from '@/components/layout'
import SignupFormComponent from '@/components/signup-form.component'
import RedirectIfAuthenticated from '@/hoc/redirect-if-authenticated'

/**
 * Component to sign up
 */
const SignUp = () => {

    return (
        <Layout >
            <SignupFormComponent />
        </Layout>
    )
}

export default RedirectIfAuthenticated(SignUp)