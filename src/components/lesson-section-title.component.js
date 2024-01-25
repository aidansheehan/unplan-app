
/**
 * Component to display a lesson section title
 * @param {string} title Title text to display
 */
const LessonSectionTitle = ({title, isComingSoon}) => {

    return (
        <div className="flex items-baseline gap-2 mb-4 mt-8">
            <h2 className="text-sm font-bold uppercase" >{title}</h2>
            {isComingSoon && (
                <span className="text-xs font-semibold text-blue-500 bg-blue-100 rounded-full px-2 py-1">
                Coming Soon
                </span>
            )}
            <hr className="flex-grow border-t border-gray-300 rounded-md shadow-none" />
        </div>
    )
}

export default LessonSectionTitle