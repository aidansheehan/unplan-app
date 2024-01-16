// import formatDate from "@/functions/format-date.function";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from 'lodash'

/**
 * Component to display metadata about a lesson
 * @param {lessonData} lessonData Lesson Metadata object
 */
const LessonMetadataComponent = ({ lessonData }) => {
    
    //Destructure lessonData
    const { duration, topic, ageGroup, level, objectives, isOnline, isOneToOne, createdAt, editedAt } = lessonData

    console.log('created at: ', createdAt)
    console.log('edited at: ', editedAt)
    // TODO maybe display dates at bottom of page?
    // const creationDate = formatDate(createdAt)
    // const lastEditDate = editedAt ? formatDate(editedAt) : null

    return (
        <div className="bg-white">

            {/* Header */}
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2 w-full">

                    <div className="w-full flex flex-col items-start" >
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">{topic}</h2>
                        <hr className="w-full border-t-[1px] border-gray-300 rounded-md shadow-none"/>

                        <div className="flex flex-flow gap-2 mt-2" >
                            <span className="text-sm bg-gray-100 text-gray-600 rounded px-2 py-1">
                                {isOnline ? 'Online' : 'In-Person'}
                            </span>
                            <span className="text-sm bg-gray-100 text-gray-600 rounded px-2 py-1" >
                                {isOneToOne ? 'One-to-One' : 'Group Class'}
                            </span>
                        </div>

                    </div>

                    <div className="bg-blue-600 text-white rounded-lg p-3 text-center flex flex-col ml-16">
                        <FontAwesomeIcon icon={faClock} className="text-white mb-2" size='lg'/>
                        <div>
                        <span className="text-lg">{duration}&nbsp;</span>
                        <span className="text-sm">min</span>
                        </div>
                    </div>

                </div>

            </div>


          <div className="my-6 grid grid-cols-[auto_1fr] gap-y-2 gap-x-4 items-start justify-start ">

            <div class="text-sm font-bold text-gray-600">Level:</div>
            <div class="text-sm text-gray-600">{level}</div>
            
            <div class="text-sm font-bold text-gray-600">Age Group:</div>
            <div class="text-sm text-gray-600">{_.capitalize(ageGroup)}</div>

            <div class="text-sm font-bold text-gray-600">Objectives:</div>
            <div class="text-sm text-gray-600">{objectives}</div>

          </div>

        </div>
      );
}

export default LessonMetadataComponent