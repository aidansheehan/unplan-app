import { useAuth } from "@/context/auth.context"
import AuthLayoutComponent from "./authenticated-layout.component"
import UnauthLayout from "./unauthenticated-layout.component"

/**
 * Layout component responsible for rendering appropriate layout based on auth state
 */
const LayoutComponent = ({children}) => {

    const { user } = useAuth()

    if (!user) return (
      <UnauthLayout >
          {children}
      </UnauthLayout>
    )

    else return (
      <AuthLayoutComponent >
          {children}
      </AuthLayoutComponent>
    )
}

export default LayoutComponent