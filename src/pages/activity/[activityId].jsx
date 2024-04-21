import ACTIVITY_INFO from "@/constants/activity-info.constant"
import ActivityInstructionsComponent from "@/components/activity-instructions.component"
import { useEffect, useState } from "react"
import LoadingSpinner from "@/components/loading-spinner"
import TinyMceEditor from "@/components/tinymce-editor.component"
import ProtectedRoute from "@/hoc/protected-route.hoc"
import PageHeaderComponent from "@/components/page-header"
import { useActivities } from "@/context/activities.context"
import { useRouter } from "next/router"

/**
 * Page to view & print a generated activity
 */
const ViewActivity = ({activityId}) => {

    const { activities }    = useActivities()
    const router            = useRouter()
    const activityData      = activities.find(a => a.id === activityId)

    if (!activityData) {
        router.replace('/not-found')
        return <></>
    }

    const { worksheetUrl, activity, topic } = activityData

    const [ worksheetLoading, setWorksheetLoading ] = useState(true)
    const [ worksheetContent, setWorksheetContent ] = useState('')

    /** Load Activity Content */
    useEffect(() => {

        //Function to fetch worksheet
        const fetchWorksheet = async () => {

            try {

                const response  = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_URL}getContent?urlPath=${encodeURIComponent(worksheetUrl)}`)
                const data      = await response.json()

                //Set worksheetContent
                setWorksheetContent(data.content)

            } catch (error) {
                console.error(`Error fetching activity content: ${error}`)
                setWorksheetContent(`<p>Failed to load content.</p>`)
            } finally {
                setWorksheetLoading(false)
            }
        }

        fetchWorksheet()    //Fetch the worksheet

    }, [ worksheetUrl ])

    return (
        <>

            <PageHeaderComponent text={`${ACTIVITY_INFO[activity].title} - ${topic}`} />

            <ActivityInstructionsComponent instructionText={ACTIVITY_INFO[activity].instructions} />

            {
                worksheetLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="w-full flex-grow p-4" >
                        <TinyMceEditor title='TEST TITLE' contentUrl={worksheetUrl} value={worksheetContent} setValue={setWorksheetContent} id={activityId} />
                    </div>
                    
                )
            }

        </>
    )
}

export async function getServerSideProps(context) {

    //Get activity ID from params
    const { activityId } = context.params

    return {
        props: {
            activityId
        }
    }

}

export default ProtectedRoute(ViewActivity)