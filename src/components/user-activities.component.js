import LoadingSpinner from "./loading-spinner"
import GrammarVocabCard from "./grammar-vocabulary.card.component"
import FindSomeoneWhoCard from "./find-sb-who.card.component"
import ReadingComprehensionCard from "./reading-comprehension.card.component"
import { useAuth } from "@/context/auth.context"
import apiRequest from "@/services/api-request"

const { useState, useEffect } = require("react")

const UserActivitiesComponent = () => {

    const [ activities, setActivities ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)

    const { getToken }      = useAuth()

    useEffect(() => {

        const fetchYourActivities = async () => {

            setIsLoading(true)

            const authToken = await getToken()
            if (!authToken) {
                throw new Error('User is not authenticated')
            }

            // Get user activities
            const activitiesData = await apiRequest('getActivities', { authToken })

            setActivities(activitiesData)
            setIsLoading(false)

        }

        fetchYourActivities()
    }, [])

    return (

        <div className="mt-4 py-4" >
            <h2 className="w-full text-center text-lg mb-6 font-bold" >Your Activities</h2>
            {
                isLoading ? (
                    <LoadingSpinner />
                ) : (
                    activities?.length === 0 ? (
                        <p className="mb-8 w-full text-center mt-8">No activities created yet. Start creating!</p>
                    ) : (
                        <div className="px-4 flex flex-col flex-flow justify-start w-full gap-4 ">

                            {
                                activities?.map(activity => {

                                    if (activity.activity === 'grammarVocab') {
                                        return <GrammarVocabCard activity={activity} key={activity.id} />
                                    } else if (activity.activity === 'findSbWho') {
                                        return <FindSomeoneWhoCard activity={activity} key={activity.id} />
                                    } else if (activity.activity === 'readingComprehension') {
                                        return <ReadingComprehensionCard activity={activity} key={activity.id} />
                                    }
                                })
                            }

                        </div>
                    )

                )
            }

        </div>

    )
}

export default UserActivitiesComponent