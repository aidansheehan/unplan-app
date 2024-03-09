import { useAuth } from "@/context/auth.context"
import AuthLayoutComponent from "./authenticated-layout.component"
import UnauthLayout from "./unauthenticated-layout.component"
import { useLessons } from "@/context/lessons.context"
import { useActivities } from "@/context/activities.context"
import { useLessonsLibrary } from "@/context/lessons-library.context"
import { useEffect, useState } from "react"
import PreloaderComponent from "../preloader.component"

/**
 * Layout component responsible for rendering appropriate layout based on auth state
 */
const LayoutComponent = ({children}) => {

    const [ preloadFinished, setPreloadFinished ] = useState(false)
    const [ appLoaded, setAppLoaded ]             = useState(false)

    const { user, loading: isAuthLoading }    = useAuth()
    const { isLoading: isLessonsLoading }     = useLessons()
    const { isLoading: isActivitiesLoading }  = useActivities()
    const { isLoading: isLibraryLoading }     = useLessonsLibrary()

    useEffect(() => {

        // If loaded all resources
        if (!isAuthLoading && !isLessonsLoading && !isActivitiesLoading && !isLibraryLoading) {
          setAppLoaded(true)
        }
    }, [isAuthLoading, isLessonsLoading, isActivitiesLoading, isLibraryLoading])

    return (
      <>
        {!preloadFinished ? <PreloaderComponent appLoaded={appLoaded} setPreloadFinished={setPreloadFinished} /> : null}

        {appLoaded ? (
            !user ? (
              <UnauthLayout >
                  {children}
              </UnauthLayout>
            ) : (
              <AuthLayoutComponent >
                {children}
              </AuthLayoutComponent>
            )
        ) : <></>}

      </>
    )
}

export default LayoutComponent