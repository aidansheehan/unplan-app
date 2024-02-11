import Layout from "@/components/layout"
import { UserAuth } from "@/context/auth.context"

/**
 * POC protected route
 * TBD remove
 */
const Protected = () => {

    const { user } = UserAuth()

    console.log('user: ', user)

    if (!user) {
        return (
            <Layout >
                You need to be logged in to view this page 😔
            </Layout>
        )
    }

    return (
        <Layout >
            <p>Welcome to the protected page! 😊</p>
            <p>{`Hello, ${user.email}!`}</p>
        </Layout>
    )
}

export default Protected