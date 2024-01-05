import Layout from "@/components/layout"
import TextContentPresentationComponent from "@/components/text-content-presentation/text-content-presentation.component"
import { faFrownOpen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { doc, getDoc } from "firebase/firestore"
import Link from "next/link"
import { db } from "../../../firebaseConfig"

/**
 * Page to view & print a generated activity
 */
const ViewActivity = ({worksheetUrl, activityName, topic, error}) => {

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

            <div className='w-full flex-grow p-4' >
                <TextContentPresentationComponent title={`${activityName} - ${topic}`} mdContentUrl={worksheetUrl} />
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
        const { worksheetUrl, activityName, topic  } = activityData

        return {
            props: {
                worksheetUrl,
                activityName,
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