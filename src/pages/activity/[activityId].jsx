import { faFrownOpen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { doc, getDoc } from "firebase/firestore"
import Link from "next/link"
import { db } from "../../../firebaseConfig"
import ACTIVITY_INFO from "@/constants/activity-info.constant"
import ActivityInstructionsComponent from "@/components/activity-instructions.component"
import { useEffect, useState } from "react"
import LoadingSpinner from "@/components/loading-spinner"
import TinyMceEditor from "@/components/tinymce-editor.component"
import ProtectedRoute from "@/hoc/protected-route.hoc"
import PageHeaderComponent from "@/components/page-header"

/**
 * Page to view & print a generated activity
 */
const ViewActivity = ({worksheetUrl, activity, topic, activityId, error}) => {

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

    //Handle error
    if (error) {
        return (
                <div className="w-full h-full p-4 text-center">
                    <FontAwesomeIcon icon={faFrownOpen} size="3x" className="text-orange-500 mb-4" />
                    <h2 className="text-2xl font-bold text-blue-900 mb-4">Oops! Activity not found.</h2>
                    <p className="text-lg text-blue-700 mb-6">
                        We couldn't find the activity you're looking for. It might have been removed or the link could be incorrect.
                    </p>
                    <Link href="/" className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-300">
                            Go Back to Home
                    </Link>
                </div>
        )
    }

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

    try {

        //Fetch activity data from firestore
        const activityDocRef    = doc(db, 'activities', activityId)
        const activityDoc       = await getDoc(activityDocRef)

        //Activity doc not found
        if (!activityDoc.exists()) {
            throw new Error('Activity not found')
        }

        //Get activityData
        const activityData = activityDoc.data()

        //Destructure activityData
        const { worksheetUrl, activity, topic } = activityData

        return {
            props: {
                worksheetUrl,
                activity,
                topic,
                activityId
            }
        }
    } catch (error) {
        return {
            props: { error: error.message }
        }
    }
}

export default ProtectedRoute(ViewActivity)