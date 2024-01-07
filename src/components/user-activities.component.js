import { useError } from "@/context/error.context"
import LoadingSpinner from "./loading-spinner"
import Link from "next/link"
import GrammarVocabCard from "./grammar-vocabulary.card.component"
import FindSomeoneWhoCard from "./find-sb-who.card.component"
import ReadingComprehensionCard from "./reading-comprehension.card.component"

const { useState, useEffect } = require("react")

const UserActivitiesComponent = () => {

    const [ activities, setActivities ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)

    const { handleError } = useError()

    useEffect(() => {

        const fetchYourActivities = async () => {

            //Fetch Activity IDs from local storage
            const activityIds = JSON.parse(localStorage.getItem('activityIds')) || []

            if (activityIds && activityIds.length) {
                setIsLoading(true)
                const activityIdsQuery = activityIds.join(',')
                const res = await fetch(`/api/get-activities?ids=${activityIdsQuery}`)
                if (!res.ok) {
                    handleError
                }
                const activitiesData = await res.json()
                
                setActivities(activitiesData)
                setIsLoading(false)
            }

        }

        fetchYourActivities()
    }, [])

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (activities.length === 0) {
        return <p className="mb-8 w-full text-center mt-8">No activities created yet. Start creating!</p>
    }

    return (

        <div className=" py-6" >
            <h2 className="w-full text-center text-lg mb-6 font-bold" >Your Activities</h2>
            <div className="px-4 flex flex-col flex-flow justify-start w-full gap-4 ">

                {
                activities.map(activity => {

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
        </div>

    )
}

export default UserActivitiesComponent