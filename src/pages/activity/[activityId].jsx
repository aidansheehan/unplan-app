import Layout from "@/components/layout"
import TextContentPresentationComponent from "@/components/text-content-presentation/text-content-presentation.component"
import { faFrownOpen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { doc, getDoc } from "firebase/firestore"
import Link from "next/link"
import { db } from "../../../firebaseConfig"
import ACTIVITY_INSTRUCTIONS from "@/constants/activity-info.constant"
import ActivityInstructionsComponent from "@/components/activity-instructions.component"

/**
 * Page to view & print a generated activity
 */
const ViewActivity = ({worksheetUrl, activity, topic, error}) => {

    //Handle error
    if (error) {
        return (
            <Layout title="Activity Not Found">
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
            </Layout>
        )
    }

    return (
        <Layout title='Your Activity' >

            <ActivityInstructionsComponent instructionText={ACTIVITY_INSTRUCTIONS[activity].instructions} />

            <div className='w-full flex-grow p-4' >
                <TextContentPresentationComponent title={`${ACTIVITY_INSTRUCTIONS[activity].title} - ${topic}`} mdContentUrl={worksheetUrl} />
            </div>
        </Layout>
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
        const { worksheetUrl, activity, topic  } = activityData

        return {
            props: {
                worksheetUrl,
                activity,
                topic
            }
        }
    } catch (error) {
        return {
            props: { error: error.message }
        }
    }
}

export default ViewActivity