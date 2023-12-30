import LessonCard from "./lesson-card.component"


const LessonsGrid = ({ lessons }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-h-full">
            {lessons.map(lesson => (
                <LessonCard key={lesson.id} lesson={lesson} />
            ))}
        </div>
    );
};


export default LessonsGrid