
/**
 * Component to display a lesson section title
 * @param {string} title Title text to display
 */
const LessonSectionTitle = ({title}) => {

    return (
        <div className="flex items-baseline gap-2 mb-4">
            <h2 className="text-sm font-bold uppercase" >{title}</h2>
            <hr className="flex-grow border-t border-gray-300 rounded-md shadow-none" />
        </div>
    )
}

export default LessonSectionTitle