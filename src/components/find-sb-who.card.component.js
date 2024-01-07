import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

//TODO refactor
const bgColor = 'bg-purple-100'
const iconColor = 'text-purple-500'

const FindSomeoneWhoCard = ({ activity }) => {
    return (
        <Link href={`/activity/${activity.id}`} className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer border border-purple-500 flex flex-row justify-between items-center">
            <div className="p-6 w-4/5 h-full rounded-md">
                <h3 className="text-md font-semibold text-gray-800">'Find Someone Who'</h3>
                <ul>
                    <li className="text-sm text-gray-600">{activity.topic}</li>
                    <li className="text-sm text-gray-600">{activity.level}</li>
                    <li className="text-sm text-gray-600">{activity.ageGroup}</li>
                </ul>
            </div>
            <div className={`p-4 inline-flex rounded-full ${bgColor} mr-4`}>
                <FontAwesomeIcon icon={faUsers} className={iconColor} size='2x' />
            </div>
        </Link>
        
    );
};

export default FindSomeoneWhoCard