import { useAuth } from '@/context/auth.context';
import ProtectedRoute from '@/hoc/protected-route.hoc';
import Link from 'next/link';

const Home = () => {

  const { user } = useAuth()

  return (
    <>
        <div className='flex flex-col items-center justify-center bg-white p-10 rounded-lg md:shadow-md max-w-md text-sm text-center my-4'>
            <p>{`Hello, ${user.email}.`}</p>
            <p>Welcome to a protected page! 😊</p>
            <p>You can't see this if you're not signed in.</p>
            <p>I will be a dashboard one day</p>
        </div>
        <Link href='/settings' >
            Settings
        </Link>
    </>

  )
}

export default ProtectedRoute(Home)


