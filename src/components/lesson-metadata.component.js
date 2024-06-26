// import formatDate from "@/functions/format-date.function";
import { ClockIcon } from '@heroicons/react/24/outline'
import _ from 'lodash'

/**
 * Component to display metadata about a lesson
 * @param {lessonData} lessonData Lesson Metadata object
 */
const LessonMetadataComponent = ({ lessonData }) => {
    
    //Destructure lessonData
    const { duration, topic, ageGroup, level, objectives, isOnline, isOneToOne } = lessonData

    // TODO maybe display dates at bottom of page?
    // const creationDate = formatDate(createdAt)
    // const lastEditDate = editedAt ? formatDate(editedAt) : null

    return (
        <div className="bg-white">

            {/* Header */}
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2 w-full">

                    <div className="w-full flex flex-col items-start" >
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 font-bree">{_.startCase(topic)}</h2>
                        <hr className="border-t-[1px] border-gray-300 rounded-md shadow-none w-[98%]"/>

                        <div className="flex flex-flow gap-2 mt-2" >
                            <span className="text-sm bg-gray-100 text-gray-600 rounded px-2 py-1">
                                {isOnline ? 'Online' : 'In-Person'}
                            </span>
                            <span className="text-sm bg-gray-100 text-gray-600 rounded px-2 py-1" >
                                {isOneToOne ? 'One-to-One' : 'Group Class'}
                            </span>
                        </div>

                    </div>

                    <div className="bg-accent text-white rounded-lg p-3 text-center flex flex-col">
                        <ClockIcon className='h-8' />
                        <div>
                        <span className="text-lg">{duration}&nbsp;</span>
                        <span className="text-sm">min</span>
                        </div>
                    </div>

                </div>

            </div>


          <div className="grid grid-cols-[auto_1fr] gap-y-2 gap-x-4 items-start justify-start mt-2 mb-2 ">

            <div className="text-sm font-bold text-gray-600">Level:</div>
            <div className="text-sm text-gray-600">{level.charAt(0).toUpperCase() + level.slice(1)}</div>
            
            <div className="text-sm font-bold text-gray-600">Age Group:</div>
            <div className="text-sm text-gray-600">{_.capitalize(ageGroup)}</div>

            <div className="text-sm font-bold text-gray-600">Objectives:</div>
            <div className="text-sm text-gray-600">{objectives}</div>

          </div>

        </div>
      );
}

export default LessonMetadataComponent