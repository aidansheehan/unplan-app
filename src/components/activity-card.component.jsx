import Link from "next/link"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import ACTIVITY_INFO from "@/constants/activity-info.constant"
import _ from 'lodash'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ActivityCard = ({ id, activity, ageGroup, level, topic, textComplexityLevel }) => {

    const href = `/activities/${id}`

    const activityInfo = ACTIVITY_INFO[activity]

    let listData = []  // Init listData

    if (activity === 'findSbWho') {
        listData = [
            level,
            ageGroup,
        ]
    } else if (activity === 'readingComprehension') {
        listData = [
            textComplexityLevel,
            ageGroup,
        ]
    } else if (activity === 'grammarVocab') {
        listData = [
            ageGroup,
            level,
        ]
    }

    return (
        <Link
            href={href}
            className="relative rounded-lg border border-lilac-300 bg-white px-6 py-5 shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out focus-within:ring-2 focus-within:ring-lilac-500 focus-within:ring-offset-2 hover:border-lilac-500 cursor-pointer"
        >
            <div className="flex flex-col justify-between h-full">
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>{topic}</h2>
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <FontAwesomeIcon icon={activityInfo.icon} size='2x' className="text-lilac-500"/>
                    </div>
                    <div className="min-w-0 flex-1">
                        {/* Activity detail list */}
                        <ul className="text-sm text-gray-700">
                            {listData.map((item, idx) => (
                                <li key={`${href}-list-${idx}`} className="mb-1">
                                    {_.capitalize(item)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-4 pt-2 border-t border-lilac-200 bg-lilac-50 rounded-b-lg flex items-center justify-between">
                    {/* Include a ClockIcon if there is a duration field, otherwise just show the CTA */}
                    <span className="flex items-center text-sm text-gray-700">
                        {activityInfo.title}
                    </span>
                    <ArrowRightIcon className="h-5 w-5 text-lilac-500 group-hover:text-lilac-600" />
                </div>
            </div>
        </Link>
    );
};

export default ActivityCard;
