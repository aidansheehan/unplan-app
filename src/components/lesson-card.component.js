import Link from "next/link";

/**
 * Card component to display metadata about the lesson
 */
const LessonCard = ({ lesson }) => {

    return (
        <Link href={`/view-lesson/${lesson.id}`} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer"> {/* Styling added here */}
            <div className="p-4"> {/* Padding inside card */}
                <h3 className="text-lg font-semibold">{lesson.topic}</h3>
                <p className="text-sm text-gray-600">{lesson.level}</p>
                <p className="text-sm text-gray-600">{lesson.duration} minutes</p>
                <p className="text-sm text-gray-600">{lesson.objective}</p>
                {/* Add more metadata fields as needed */}
            </div>
        </Link>
    );
  };
  
  export default LessonCard;
  