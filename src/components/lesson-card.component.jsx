import Link from "next/link";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowRightIcon, ClockIcon } from "@heroicons/react/24/outline";
import _ from 'lodash'

const LessonCard = ({ id, topic, level, ageGroup, duration }) => {

    const href = `/view-lesson/${id}`

    return (
        <Link
            href={href}
            className="relative rounded-lg border border-divider bg-white px-6 py-5 shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 hover:border-accent cursor-pointer"
        >
            <h2 className='text-xl font-semibold text-primaryText mb-4'>{topic}</h2>
            <div className="flex items-center space-x-4 text-secondaryText">
                <div className="flex-shrink-0">
                    <FontAwesomeIcon icon={faChalkboardTeacher} size="3x" className="text-lightPrimary" />
                </div>
                <div className="min-w-0 flex-1">
                    {/* Lesson detail list */}
                    <ul className="text-sm">
                        {[level, ageGroup].map((lD_, idx) => (
                            <li key={`${id}-list-${idx}`} className="mb-1">
                                {lD_[0] === lD_[0].toLowerCase() ? _.capitalize(lD_) : lD_}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="mt-4 pt-2 border-t border-divider rounded-b-lg flex items-center justify-between">
                    <div className="flex items-center text-sm">
                        <ClockIcon className="h-5 w-5 text-lilac-500 mr-2" />
                        <span>{duration} min</span>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 group-hover:text-primaryText" />
                </div>

        </Link>
    )
};

export default LessonCard;

