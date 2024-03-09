import { useAuth } from "@/context/auth.context"
import AuthLayoutComponent from "./authenticated-layout.component"
import UnauthLayout from "./unauthenticated-layout.component"
import { useLessons } from "@/context/lessons.context"
import { useActivities } from "@/context/activities.context"
import { useLessonsLibrary } from "@/context/lessons-library.context"
import { useEffect, useState } from "react"

/**
 * Layout component responsible for rendering appropriate layout based on auth state
 */
const LayoutComponent = ({children}) => {

    const [ preloadFinished, setPreloadFinished ] = useState(false)

    const { user, loading: isAuthLoading }    = useAuth()
    const { lessons, isLoading: isLessonsLoading }     = useLessons()
    const { activities, isLoading: isActivitiesLoading }  = useActivities()
    const { isLoading: isLibraryLoading }     = useLessonsLibrary()

    useEffect(() => {

        // If loaded all resources
        if (!isAuthLoading && !isLessonsLoading && !isActivitiesLoading && !isLibraryLoading) {
          setPreloadFinished(true)
        }
    }, [isAuthLoading, isLessonsLoading, isActivitiesLoading, isLibraryLoading])

    // TODO preloader
    if (!preloadFinished) return (
      <></>
    )



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