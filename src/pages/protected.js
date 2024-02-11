import Layout from '@/components/layout'
import { useAuth } from '@/context/auth.context'
import ProtectedRoute from '@/hoc/protected-route.hoc'

/**
 * POC protected route
 * TBD remove
 */
const Protected = () => {

    const { user } = useAuth()

    return (
        <Layout >
            <p>Welcome to the protected page! 😊</p>
            <p>{`Hello, ${user.email}!`}</p>
        </Layout>
    )
}

export default ProtectedRoute(Protected)