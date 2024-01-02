import Link from "next/link";

/**
 * Utility function to capitalize the first letter of a string
 */
const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Card component to display metadata about the lesson
 */
const LessonCard = ({ lesson }) => {
    return (
        <Link href={`/view-lesson/${lesson.id}`} className="block bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer">
                <div className="p-6 border-l-4 border-green-500 h-full"> {/* Choose between green or orange */}
                    <h3 className="text-lg font-semibold text-gray-800">{lesson.topic}</h3>
                    <p className="text-sm text-gray-600">{capitalizeFirstLetter(lesson.level)}</p>
                    <p className="text-sm text-gray-600">{lesson.duration} minutes</p>
                    {/* Display age group if present */}
                    {lesson.ageGroup && (
                        <p className="text-gray-600 text-sm">Age Group: {capitalizeFirstLetter(lesson.ageGroup)}</p>
                    )}
                    <p className="text-sm text-gray-600">{lesson.objectives}</p>
                    {/* Add more metadata fields as needed */}
                </div>
        </Link>
    );
};

  
  export default LessonCard;
  