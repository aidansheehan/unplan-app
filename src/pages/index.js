import Layout from '@/components/layout';
import { useAuth } from '@/context/auth.context';
import ProtectedRoute from '@/hoc/protected-route.hoc';

const Home = () => {

  const { user } = useAuth()

  return (
    <Layout>
        <p>{`Hello, ${user.email}.`}</p>
        <p>Welcome to a protected page! 😊</p>
        <p>You can't see this if you're not signed in.</p>
        <p>I will be a dashboard one day</p>
    </Layout>
  )
}

export default ProtectedRoute(Home)


