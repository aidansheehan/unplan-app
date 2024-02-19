import Layout from '@/components/layout'
import LoginFormComponent from '@/components/login-form.component'
import RedirectIfAuthenticated from '@/hoc/redirect-if-authenticated'

/**
 * Component to log in
 */
const LogIn = () => {

    return (
        <Layout >
            <LoginFormComponent />
        </Layout>
    )
}

export default RedirectIfAuthenticated(LogIn)